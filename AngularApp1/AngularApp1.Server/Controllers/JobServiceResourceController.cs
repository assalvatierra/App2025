using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobServiceResourceController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public JobServiceResourceController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/JobServiceResource
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetJobServiceResources()
        {
            var jobServiceResources = await _context.JobServiceResource
                .Include(jsr => jsr.JobService)
                .Include(jsr => jsr.Resource)
                .Select(jsr => new
                {
                    jsr.Id,
                    jsr.JobServiceId,
                    jsr.ResourceId,
                    JobService = jsr.JobService != null ? new
                    {
                        jsr.JobService.Id,
                        jsr.JobService.Particulars,
                        jsr.JobService.DateStart,
                        jsr.JobService.DateEnd
                    } : null,
                    Resource = jsr.Resource != null ? new
                    {
                        jsr.Resource.Id,
                        jsr.Resource.Name,
                        jsr.Resource.Code,
                        jsr.Resource.Description
                    } : null
                })
                .ToListAsync();

            return Ok(jobServiceResources);
        }

        // GET: api/JobServiceResource/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetJobServiceResource(int id)
        {
            var jobServiceResource = await _context.JobServiceResource
                .Include(jsr => jsr.JobService)
                .Include(jsr => jsr.Resource)
                .Where(jsr => jsr.Id == id)
                .Select(jsr => new
                {
                    jsr.Id,
                    jsr.JobServiceId,
                    jsr.ResourceId,
                    JobService = jsr.JobService != null ? new
                    {
                        jsr.JobService.Id,
                        jsr.JobService.Particulars,
                        jsr.JobService.DateStart,
                        jsr.JobService.DateEnd
                    } : null,
                    Resource = jsr.Resource != null ? new
                    {
                        jsr.Resource.Id,
                        jsr.Resource.Name,
                        jsr.Resource.Code,
                        jsr.Resource.Description
                    } : null
                })
                .FirstOrDefaultAsync();

            if (jobServiceResource == null)
            {
                return NotFound();
            }

            return jobServiceResource;
        }

        // GET: api/JobServiceResource/ByJobService/5
        [HttpGet("ByJobService/{jobServiceId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetByJobService(int jobServiceId)
        {
            try
            {
                var jobServiceResources = await _context.JobServiceResource
                    .Include(jsr => jsr.Resource)
                    .Where(jsr => jsr.JobServiceId == jobServiceId)
                    .Select(jsr => new
                    {
                        jsr.Id,
                        jsr.JobServiceId,
                        jsr.ResourceId,
                        Resource = jsr.Resource != null ? new
                        {
                            jsr.Resource.Id,
                            jsr.Resource.Name,
                            jsr.Resource.Code,
                            jsr.Resource.Description,
                            jsr.Resource.Remarks
                        } : null
                    })
                    .ToListAsync();

                return Ok(jobServiceResources);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetByJobService: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "An error occurred while retrieving job service resources.", error = ex.Message });
            }
        }

        // GET: api/JobServiceResource/ByResource/5
        [HttpGet("ByResource/{resourceId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetByResource(int resourceId)
        {
            var jobServiceResources = await _context.JobServiceResource
                .Include(jsr => jsr.JobService)
                .Where(jsr => jsr.ResourceId == resourceId)
                .Select(jsr => new
                {
                    jsr.Id,
                    jsr.JobServiceId,
                    jsr.ResourceId,
                    JobService = jsr.JobService != null ? new
                    {
                        jsr.JobService.Id,
                        jsr.JobService.Particulars
                    } : null
                })
                .ToListAsync();

            return Ok(jobServiceResources);
        }

        // PUT: api/JobServiceResource/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobServiceResource(int id, JobServiceResource jobServiceResource)
        {
            if (id != jobServiceResource.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobServiceResource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobServiceResourceExists(id))
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

        // POST: api/JobServiceResource
        [HttpPost]
        public async Task<ActionResult<JobServiceResource>> PostJobServiceResource(JobServiceResource jobServiceResource)
        {
            try
            {
                Console.WriteLine("=== POST JobServiceResource Debug Info ===");
                Console.WriteLine($"Incoming JobServiceResource:");
                Console.WriteLine($"  JobServiceId: {jobServiceResource.JobServiceId}");
                Console.WriteLine($"  ResourceId: {jobServiceResource.ResourceId}");

                // VALIDATION: Check if JobServiceId exists
                if (jobServiceResource.JobServiceId.HasValue)
                {
                    var jobServiceExists = await _context.JobService.AnyAsync(js => js.Id == jobServiceResource.JobServiceId.Value);
                    Console.WriteLine($"  JobService exists: {jobServiceExists}");

                    if (!jobServiceExists)
                    {
                        return BadRequest(new
                        {
                            error = "Invalid JobServiceId",
                            message = $"JobService with Id {jobServiceResource.JobServiceId} does not exist"
                        });
                    }
                }
                else
                {
                    return BadRequest(new
                    {
                        error = "JobServiceId is required",
                        message = "JobServiceId cannot be null"
                    });
                }

                // VALIDATION: Check if ResourceId exists
                if (jobServiceResource.ResourceId.HasValue)
                {
                    var resourceExists = await _context.Resource.AnyAsync(r => r.Id == jobServiceResource.ResourceId.Value);
                    Console.WriteLine($"  Resource exists: {resourceExists}");

                    if (!resourceExists)
                    {
                        return BadRequest(new
                        {
                            error = "Invalid ResourceId",
                            message = $"Resource with Id {jobServiceResource.ResourceId} does not exist"
                        });
                    }
                }
                else
                {
                    return BadRequest(new
                    {
                        error = "ResourceId is required",
                        message = "ResourceId cannot be null"
                    });
                }

                // VALIDATION: Check for duplicate
                var duplicateExists = await _context.JobServiceResource
                    .AnyAsync(jsr => jsr.JobServiceId == jobServiceResource.JobServiceId
                                 && jsr.ResourceId == jobServiceResource.ResourceId);

                Console.WriteLine($"  Duplicate exists: {duplicateExists}");

                if (duplicateExists)
                {
                    return BadRequest(new
                    {
                        error = "Duplicate entry",
                        message = "This job service-resource relationship already exists"
                    });
                }

                // Add to context
                _context.JobServiceResource.Add(jobServiceResource);
                Console.WriteLine("Entity added to context");

                // Save changes
                Console.WriteLine("Attempting to save changes...");
                await _context.SaveChangesAsync();
                Console.WriteLine($"Save successful! Generated Id: {jobServiceResource.Id}");

                Console.WriteLine("=== POST JobServiceResource Success ===");
                return CreatedAtAction("GetJobServiceResource", new { id = jobServiceResource.Id }, jobServiceResource);
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine("=== DbUpdateException ===");
                Console.WriteLine($"Error: {dbEx.Message}");
                Console.WriteLine($"Inner Exception: {dbEx.InnerException?.Message}");
                Console.WriteLine($"Stack Trace: {dbEx.StackTrace}");

                return StatusCode(500, new
                {
                    error = "Database update error",
                    message = dbEx.Message,
                    innerError = dbEx.InnerException?.Message,
                    details = "Check console logs for full stack trace"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("=== General Exception ===");
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                return StatusCode(500, new
                {
                    error = "Server error",
                    message = ex.Message,
                    innerError = ex.InnerException?.Message,
                    details = "Check console logs for full stack trace"
                });
            }
        }

        // DELETE: api/JobServiceResource/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobServiceResource(int id)
        {
            var jobServiceResource = await _context.JobServiceResource.FindAsync(id);
            if (jobServiceResource == null)
            {
                return NotFound();
            }

            _context.JobServiceResource.Remove(jobServiceResource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobServiceResourceExists(int id)
        {
            return _context.JobServiceResource.Any(e => e.Id == id);
        }
    }
}
