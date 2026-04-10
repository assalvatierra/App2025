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
    public class JobMainStatusController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public JobMainStatusController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/JobMainStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobMainStatus>>> GetJobMainStatus()
        {
            return await _context.JobMainStatus.ToListAsync();
        }

        // GET: api/JobMainStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobMainStatus>> GetJobMainStatus(int id)
        {
            var jobMainStatus = await _context.JobMainStatus.FindAsync(id);

            if (jobMainStatus == null)
            {
                return NotFound();
            }

            return jobMainStatus;
        }

        // GET: api/JobMainStatus/ByJobMain/5
        [HttpGet("ByJobMain/{jobMainId}")]
        public async Task<ActionResult<IEnumerable<JobMainStatus>>> GetJobMainStatusByJobMainId(int jobMainId)
        {
            var jobMainStatuses = await _context.JobMainStatus
                .Where(jms => jms.JobMainId == jobMainId)
                .OrderByDescending(jms => jms.StatusDate)
                .ToListAsync();

            return jobMainStatuses;
        }

        // PUT: api/JobMainStatus/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobMainStatus(int id, JobMainStatus jobMainStatus)
        {
            if (id != jobMainStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobMainStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobMainStatusExists(id))
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

        // POST: api/JobMainStatus
        [HttpPost]
        public async Task<ActionResult<JobMainStatus>> PostJobMainStatus(JobMainStatus jobMainStatus)
        {
            _context.JobMainStatus.Add(jobMainStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobMainStatus", new { id = jobMainStatus.Id }, jobMainStatus);
        }

        // DELETE: api/JobMainStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobMainStatus(int id)
        {
            var jobMainStatus = await _context.JobMainStatus.FindAsync(id);
            if (jobMainStatus == null)
            {
                return NotFound();
            }

            _context.JobMainStatus.Remove(jobMainStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobMainStatusExists(int id)
        {
            return _context.JobMainStatus.Any(e => e.Id == id);
        }
    }
}
