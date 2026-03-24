using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimesheetsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public TimesheetsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/Timesheets
        // GET: api/Timesheets?resourceId=1
        // GET: api/Timesheets?startDate=2024-01-01&endDate=2024-01-31
        // GET: api/Timesheets?statusId=1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Timesheet>>> GetTimesheets(
            [FromQuery] int? resourceId = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] int? statusId = null)
        {
            var query = _context.Timesheet
                .Include(t => t.Resource)
                .Include(t => t.ResourceId1Navigation)
                .AsQueryable();

            if (resourceId.HasValue)
            {
                query = query.Where(t => t.ResourceId == resourceId.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(t => t.TsDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(t => t.TsDate <= endDate.Value);
            }

            if (statusId.HasValue)
            {
                query = query.Where(t => t.ItemStatusId == statusId.Value);
            }

            return await query.OrderByDescending(t => t.TsDate).ToListAsync();
        }

        // GET: api/Timesheets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Timesheet>> GetTimesheet(int id)
        {
            var timesheet = await _context.Timesheet
                .Include(t => t.Resource)
                .Include(t => t.ResourceId1Navigation)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (timesheet == null)
            {
                return NotFound();
            }

            return timesheet;
        }

        // GET: api/Timesheets/ByResource/5
        [HttpGet("ByResource/{resourceId}")]
        public async Task<ActionResult<IEnumerable<Timesheet>>> GetTimesheetsByResource(int resourceId)
        {
            return await _context.Timesheet
                .Include(t => t.Resource)
                .Include(t => t.ResourceId1Navigation)
                .Where(t => t.ResourceId == resourceId)
                .OrderByDescending(t => t.TsDate)
                .ToListAsync();
        }

        // GET: api/Timesheets/ByDateRange?startDate=2024-01-01&endDate=2024-01-31
        [HttpGet("ByDateRange")]
        public async Task<ActionResult<IEnumerable<Timesheet>>> GetTimesheetsByDateRange(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            return await _context.Timesheet
                .Include(t => t.Resource)
                .Include(t => t.ResourceId1Navigation)
                .Where(t => t.TsDate >= startDate && t.TsDate <= endDate)
                .OrderByDescending(t => t.TsDate)
                .ToListAsync();
        }

        // GET: api/Timesheets/ByStatus/1
        [HttpGet("ByStatus/{statusId}")]
        public async Task<ActionResult<IEnumerable<Timesheet>>> GetTimesheetsByStatus(int statusId)
        {
            return await _context.Timesheet
                .Include(t => t.Resource)
                .Include(t => t.ResourceId1Navigation)
                .Where(t => t.ItemStatusId == statusId)
                .OrderByDescending(t => t.TsDate)
                .ToListAsync();
        }

        // GET: api/Timesheets/ByStatusCodes?codes=APPROVAL,SUBMITTED
        [HttpGet("ByStatusCodes")]
        public async Task<ActionResult<IEnumerable<Timesheet>>> GetTimesheetsByStatusCodes([FromQuery] string codes)
        {
            if (string.IsNullOrWhiteSpace(codes))
            {
                return BadRequest("Status codes parameter is required");
            }

            // Split codes and trim whitespace
            var statusCodes = codes.Split(',')
                .Select(c => c.Trim().ToUpper())
                .Where(c => !string.IsNullOrEmpty(c))
                .ToList();

            if (!statusCodes.Any())
            {
                return BadRequest("At least one valid status code is required");
            }

            // Get status IDs from codes
            var statusIds = await _context.ItemStatus
                .Where(s => s.Code != null && statusCodes.Contains(s.Code.ToUpper()))
                .Select(s => s.Id)
                .ToListAsync();

            if (!statusIds.Any())
            {
                return NotFound($"No statuses found for codes: {string.Join(", ", statusCodes)}");
            }

            // Get timesheets with matching status IDs
            var timesheets = await _context.Timesheet
                .Include(t => t.Resource)
                .Include(t => t.ResourceId1Navigation)
                .Where(t => statusIds.Contains(t.ItemStatusId ?? 0))
                .OrderByDescending(t => t.TsDate)
                .ToListAsync();

            return timesheets;
        }

        // GET: api/Timesheets/5/Jobs
        [HttpGet("{id}/Jobs")]
        public async Task<ActionResult<IEnumerable<JobTimesheetDto>>> GetTimesheetJobs(int id)
        {
            var timesheetExists = await _context.Timesheet.AnyAsync(t => t.Id == id);

            if (!timesheetExists)
            {
                return NotFound();
            }

            var result = await (
                from jt in _context.JobTimesheet
                join jm in _context.JobMain.Include(j => j.ItemStatus)
                    on jt.JobMainId equals jm.Id into jmJoin
                from jm in jmJoin.DefaultIfEmpty()
                where jt.TimesheetId == id
                select new JobTimesheetDto
                {
                    Id = jt.Id,
                    TimesheetId = jt.TimesheetId,
                    JobMainId = jt.JobMainId,
                    JobDate = jm != null ? jm.JobDate : (DateTime?)null,
                    Description = jm != null ? jm.Description : null,
                    StatusName = jm != null && jm.ItemStatus != null ? jm.ItemStatus.Name : null
                }
            ).ToListAsync();

            return Ok(result);
        }

        // GET: api/Timesheets/5/JobServices
        [HttpGet("{id}/JobServices")]
        public async Task<ActionResult<IEnumerable<JobServiceTimesheet>>> GetTimesheetJobServices(int id)
        {
            var timesheetExists = await _context.Timesheet.AnyAsync(t => t.Id == id);
            
            if (!timesheetExists)
            {
                return NotFound();
            }

            return await _context.JobServiceTimesheet
                .Where(jst => jst.TimesheetId == id)
                .ToListAsync();
        }

        // PUT: api/Timesheets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimesheet(int id, Timesheet timesheet)
        {
            if (id != timesheet.Id)
            {
                return BadRequest();
            }

            _context.Entry(timesheet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimesheetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Timesheets/5/Submit
        [HttpPut("{id}/Submit")]
        public async Task<IActionResult> SubmitTimesheet(int id, [FromBody] int? statusId = null)
        {
            var timesheet = await _context.Timesheet.FindAsync(id);
            
            if (timesheet == null)
            {
                return NotFound();
            }

            // Update status to submitted (you can customize the status ID)
            timesheet.ItemStatusId = statusId ?? 2; // Assuming 2 is "Submitted" status
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimesheetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Timesheets/5/Approve
        [HttpPut("{id}/Approve")]
        public async Task<IActionResult> ApproveTimesheet(int id, [FromBody] ApprovalRequest? request = null)
        {
            var timesheet = await _context.Timesheet.FindAsync(id);
            
            if (timesheet == null)
            {
                return NotFound();
            }

            // Update status to approved (you can customize the status ID)
            timesheet.ItemStatusId = request?.StatusId ?? 3; // Assuming 3 is "Approved" status
            
            if (!string.IsNullOrEmpty(request?.Remarks))
            {
                timesheet.Remarks = (timesheet.Remarks ?? "") + "\nApproved: " + request.Remarks;
            }
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimesheetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PUT: api/Timesheets/5/Reject
        [HttpPut("{id}/Reject")]
        public async Task<IActionResult> RejectTimesheet(int id, [FromBody] ApprovalRequest request)
        {
            var timesheet = await _context.Timesheet.FindAsync(id);
            
            if (timesheet == null)
            {
                return NotFound();
            }

            // Update status to rejected (you can customize the status ID)
            timesheet.ItemStatusId = request?.StatusId ?? 4; // Assuming 4 is "Rejected" status
            
            if (!string.IsNullOrEmpty(request?.Remarks))
            {
                timesheet.Remarks = (timesheet.Remarks ?? "") + "\nRejected: " + request.Remarks;
            }
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimesheetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Timesheets
        [HttpPost]
        public async Task<ActionResult<Timesheet>> PostTimesheet(Timesheet timesheet)
        {
            _context.Timesheet.Add(timesheet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimesheet", new { id = timesheet.Id }, timesheet);
        }

        // DELETE: api/Timesheets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimesheet(int id)
        {
            var timesheet = await _context.Timesheet.FindAsync(id);
            if (timesheet == null)
            {
                return NotFound();
            }

            _context.Timesheet.Remove(timesheet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TimesheetExists(int id)
        {
            return _context.Timesheet.Any(e => e.Id == id);
        }
    }

    // Helper class for approval requests
    public class ApprovalRequest
    {
        public int? StatusId { get; set; }
        public string? Remarks { get; set; }
    }

    // DTO for JobTimesheet with JobMain display fields
    public class JobTimesheetDto
    {
        public int Id { get; set; }
        public int? TimesheetId { get; set; }
        public int? JobMainId { get; set; }
        public DateTime? JobDate { get; set; }
        public string? Description { get; set; }
        public string? StatusName { get; set; }
    }
}
