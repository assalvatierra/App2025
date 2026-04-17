using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;
using Erp.Domain.DTOs;
using AngularApp1.Server.Data;

namespace AngularApp1.Server.Controllers
{
    /// <summary>
    /// Controller for managing Resource Calendar data
    /// Uses JobServiceResource table to display resource allocations
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceCalendarController : ControllerBase
    {
        private readonly ErpDbContext _context;
        private readonly ILogger<ResourceCalendarController> _logger;

        public ResourceCalendarController(
            ErpDbContext context, 
            ILogger<ResourceCalendarController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get resource calendar data for a specific date range
        /// </summary>
        /// <param name="startDate">Start date for calendar view</param>
        /// <param name="endDate">End date for calendar view</param>
        /// <param name="resourceIds">Comma-separated resource IDs to filter (optional)</param>
        /// <param name="statusIds">Comma-separated status IDs to filter (optional)</param>
        /// <returns>List of resources with their calendar entries</returns>
        [HttpGet]
        public async Task<ActionResult<List<ResourceCalendarDto>>> GetResourceCalendar(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate,
            [FromQuery] string? resourceIds = null,
            [FromQuery] string? statusIds = null)
        {
            try
            {
                _logger.LogInformation(
                    "Getting resource calendar from {StartDate} to {EndDate}", 
                    startDate, endDate);

                // Parse filter parameters
                var resourceIdList = ParseIds(resourceIds);
                var statusIdList = ParseIds(statusIds);

                // Build the main query with all necessary joins
                var query = from jsr in _context.JobServiceResource
                           join js in _context.JobService on jsr.JobServiceId equals js.Id
                           join jm in _context.JobMain on js.JobMainId equals jm.Id
                           join r in _context.Resource on jsr.ResourceId equals r.Id
                           where js.DateStart.HasValue 
                                 && js.DateStart.Value.Date >= startDate.Date 
                                 && js.DateStart.Value.Date <= endDate.Date
                           select new
                           {
                               JobServiceResourceId = jsr.Id,
                               JobServiceId = js.Id,
                               ResourceId = r.Id,
                               ResourceName = r.Name ?? "Unknown",
                               ResourceCode = r.Code ?? "",
                               Date = js.DateStart.Value.Date,
                               JobMainId = jm.Id,
                               JobReference = jm.Description ?? $"Job #{jm.Id}",
                               Particulars = js.Particulars,
                               StartTime = js.DateStart.HasValue ? (TimeSpan?)js.DateStart.Value.TimeOfDay : null,
                               EndTime = js.DateEnd.HasValue ? (TimeSpan?)js.DateEnd.Value.TimeOfDay : null,
                               StatusId = js.ItemStatusId,
                               QuotedAmt = js.QuotedAmt,
                               SupplierAmt = js.SupplierAmt
                           };

                // Apply resource filter
                if (resourceIdList.Any())
                {
                    query = query.Where(q => resourceIdList.Contains(q.ResourceId));
                }

                // Apply status filter
                if (statusIdList.Any())
                {
                    query = query.Where(q => q.StatusId.HasValue && statusIdList.Contains(q.StatusId.Value));
                }

                var data = await query.ToListAsync();

                _logger.LogInformation("Retrieved {Count} job service resource records", data.Count);

                // Get customer names for all jobs
                var jobMainIds = data.Select(d => d.JobMainId).Distinct().ToList();
                var jobCustomers = await GetJobCustomers(jobMainIds);

                // Get status information
                var itemStatusIds = data.Where(d => d.StatusId.HasValue)
                                   .Select(d => d.StatusId!.Value)
                                   .Distinct()
                                   .ToList();
                var statuses = await GetStatuses(itemStatusIds);

                // Group by resource and generate calendar structure
                var result = data
                    .GroupBy(d => new { d.ResourceId, d.ResourceName, d.ResourceCode })
                    .Select(g => new ResourceCalendarDto
                    {
                        ResourceId = g.Key.ResourceId,
                        ResourceName = g.Key.ResourceName,
                        ResourceCode = g.Key.ResourceCode,
                        Days = GenerateDays(startDate, endDate, g.ToList(), jobCustomers, statuses)
                    })
                    .OrderBy(r => r.ResourceName)
                    .ToList();

                _logger.LogInformation("Generated calendar for {Count} resources", result.Count);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving resource calendar data");
                return StatusCode(500, new 
                { 
                    message = "Error retrieving calendar data", 
                    error = ex.Message 
                });
            }
        }

        /// <summary>
        /// Get available resources for calendar filtering
        /// </summary>
        [HttpGet("resources")]
        public async Task<ActionResult<List<object>>> GetAvailableResources()
        {
            try
            {
                var resources = await _context.Resource
                    .OrderBy(r => r.Name)
                    .Select(r => new
                    {
                        id = r.Id,
                        name = r.Name,
                        code = r.Code
                    })
                    .ToListAsync();

                return Ok(resources);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving available resources");
                return StatusCode(500, new { message = "Error retrieving resources", error = ex.Message });
            }
        }

        /// <summary>
        /// Get available statuses for calendar filtering
        /// </summary>
        [HttpGet("statuses")]
        public async Task<ActionResult<List<object>>> GetAvailableStatuses()
        {
            try
            {
                var statuses = await _context.ItemStatus
                    .OrderBy(s => s.SortOrder)
                    .Select(s => new
                    {
                        id = s.Id,
                        name = s.Name,
                        code = s.Code
                    })
                    .ToListAsync();

                return Ok(statuses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving available statuses");
                return StatusCode(500, new { message = "Error retrieving statuses", error = ex.Message });
            }
        }

        #region Private Helper Methods

        /// <summary>
        /// Parse comma-separated IDs into a list of integers
        /// </summary>
        private List<int> ParseIds(string? ids)
        {
            if (string.IsNullOrWhiteSpace(ids))
                return new List<int>();

            try
            {
                return ids.Split(',', StringSplitOptions.RemoveEmptyEntries)
                          .Select(int.Parse)
                          .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error parsing IDs: {Ids}", ids);
                return new List<int>();
            }
        }

        /// <summary>
        /// Get primary customers for job mains
        /// </summary>
        private async Task<Dictionary<int, string>> GetJobCustomers(List<int> jobMainIds)
        {
            if (!jobMainIds.Any())
                return new Dictionary<int, string>();

            var customers = await (from jc in _context.JobCustomers
                                  join e in _context.Entity on jc.CustomerId equals e.Id
                                  where jobMainIds.Contains(jc.JobMainId ?? 0) 
                                        && jc.IsPrimary
                                  select new
                                  {
                                      JobMainId = jc.JobMainId ?? 0,
                                      CustomerName = e.Name ?? "N/A"
                                  }).ToListAsync();

            return customers.ToDictionary(c => c.JobMainId, c => c.CustomerName);
        }

        /// <summary>
        /// Get status information
        /// </summary>
        private async Task<Dictionary<int, (string Name, string? Code)>> GetStatuses(List<int> itemStatusIds)
        {
            if (!itemStatusIds.Any())
                return new Dictionary<int, (string, string?)>();

            var statuses = await _context.ItemStatus
                .Where(s => itemStatusIds.Contains(s.Id))
                .Select(s => new
                {
                    s.Id,
                    Name = s.Name ?? "Unknown",
                    s.Code
                })
                .ToListAsync();

            return statuses.ToDictionary(s => s.Id, s => (s.Name, s.Code));
        }

        /// <summary>
        /// Generate calendar days with entries
        /// </summary>
        private List<CalendarDayDto> GenerateDays<T>(
            DateTime startDate,
            DateTime endDate,
            List<T> resourceData,
            Dictionary<int, string> jobCustomers,
            Dictionary<int, (string Name, string? Code)> statuses)
        {
            var days = new List<CalendarDayDto>();

            for (var date = startDate.Date; date <= endDate.Date; date = date.AddDays(1))
            {
                var dayEntries = new List<CalendarEntryDto>();
                
                foreach (dynamic d in resourceData)
                {
                    if (d.Date == date)
                    {
                        dayEntries.Add(new CalendarEntryDto
                        {
                            Id = d.JobServiceResourceId,
                            JobServiceResourceId = d.JobServiceResourceId,
                            JobServiceId = d.JobServiceId,
                            JobMainId = d.JobMainId,
                            JobReference = d.JobReference,
                            CustomerName = jobCustomers.ContainsKey(d.JobMainId) ? jobCustomers[d.JobMainId] : "N/A",
                            Particulars = d.Particulars,
                            StartTime = d.StartTime,
                            EndTime = d.EndTime,
                            StatusName = d.StatusId.HasValue && statuses.ContainsKey(d.StatusId.Value) 
                                ? statuses[d.StatusId.Value].Name 
                                : null,
                            StatusCode = d.StatusId.HasValue && statuses.ContainsKey(d.StatusId.Value) 
                                ? statuses[d.StatusId.Value].Code 
                                : null,
                            QuotedAmt = d.QuotedAmt,
                            SupplierAmt = d.SupplierAmt
                        });
                    }
                }

                days.Add(new CalendarDayDto
                {
                    Date = date,
                    Entries = dayEntries
                });
            }

            return days;
        }

        #endregion
    }
}
