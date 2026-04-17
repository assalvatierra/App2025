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
    public class JobServiceRequirementsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public JobServiceRequirementsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/JobServiceRequirements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobServiceRequirement>>> GetJobServiceRequirements()
        {
            return await _context.JobServiceRequirement.ToListAsync();
        }

        // GET: api/JobServiceRequirements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobServiceRequirement>> GetJobServiceRequirement(int id)
        {
            var jobServiceRequirement = await _context.JobServiceRequirement.FindAsync(id);

            if (jobServiceRequirement == null)
            {
                return NotFound();
            }

            return jobServiceRequirement;
        }

        // GET: api/JobServiceRequirements/ByJobService/5
        [HttpGet("ByJobService/{jobServiceId}")]
        public async Task<ActionResult<IEnumerable<JobServiceRequirement>>> GetRequirementsByJobService(int jobServiceId)
        {
            var requirements = await _context.JobServiceRequirement
                .Where(r => r.JobServiceId == jobServiceId)
                .ToListAsync();

            return requirements;
        }

        // PUT: api/JobServiceRequirements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobServiceRequirement(int id, JobServiceRequirement jobServiceRequirement)
        {
            if (id != jobServiceRequirement.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobServiceRequirement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobServiceRequirementExists(id))
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

        // POST: api/JobServiceRequirements
        [HttpPost]
        public async Task<ActionResult<JobServiceRequirement>> PostJobServiceRequirement(JobServiceRequirement jobServiceRequirement)
        {
            _context.JobServiceRequirement.Add(jobServiceRequirement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobServiceRequirement", new { id = jobServiceRequirement.Id }, jobServiceRequirement);
        }

        // DELETE: api/JobServiceRequirements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobServiceRequirement(int id)
        {
            var jobServiceRequirement = await _context.JobServiceRequirement.FindAsync(id);
            if (jobServiceRequirement == null)
            {
                return NotFound();
            }

            _context.JobServiceRequirement.Remove(jobServiceRequirement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobServiceRequirementExists(int id)
        {
            return _context.JobServiceRequirement.Any(e => e.Id == id);
        }
    }
}
