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
    public class JobServicesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public JobServicesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/JobServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobService>>> GetJobService()
        {
            return await _context.JobService.ToListAsync();
        }

        // GET: api/JobServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobService>> GetJobService(int id)
        {
            var jobService = await _context.JobService.FindAsync(id);

            if (jobService == null)
            {
                return NotFound();
            }

            return jobService;
        }

        // PUT: api/JobServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobService(int id, JobService jobService)
        {
            if (id != jobService.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobService).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobServiceExists(id))
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

        // POST: api/JobServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JobService>> PostJobService(JobService jobService)
        {
            _context.JobService.Add(jobService);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobService", new { id = jobService.Id }, jobService);
        }

        // DELETE: api/JobServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobService(int id)
        {
            var jobService = await _context.JobService.FindAsync(id);
            if (jobService == null)
            {
                return NotFound();
            }

            _context.JobService.Remove(jobService);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobServiceExists(int id)
        {
            return _context.JobService.Any(e => e.Id == id);
        }
    }
}
