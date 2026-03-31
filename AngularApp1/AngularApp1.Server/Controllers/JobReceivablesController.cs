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
    public class JobReceivablesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public JobReceivablesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/JobReceivables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobReceivable>>> GetJobReceivables()
        {
            return await _context.JobReceivables.ToListAsync();
        }

        // GET: api/JobReceivables/byReceivable/5
        [HttpGet("byReceivable/{receivableId}")]
        public async Task<ActionResult<IEnumerable<JobReceivable>>> GetJobReceivablesByReceivable(int receivableId)
        {
            var jobReceivables = await _context.JobReceivables
                .Where(jr => jr.ReceivablesId == receivableId)
                .ToListAsync();

            return jobReceivables;
        }

        // GET: api/JobReceivables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobReceivable>> GetJobReceivable(int id)
        {
            var jobReceivable = await _context.JobReceivables.FindAsync(id);

            if (jobReceivable == null)
            {
                return NotFound();
            }

            return jobReceivable;
        }

        // PUT: api/JobReceivables/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobReceivable(int id, JobReceivable jobReceivable)
        {
            if (id != jobReceivable.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobReceivable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobReceivableExists(id))
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

        // POST: api/JobReceivables
        [HttpPost]
        public async Task<ActionResult<JobReceivable>> PostJobReceivable(JobReceivable jobReceivable)
        {
            _context.JobReceivables.Add(jobReceivable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobReceivable", new { id = jobReceivable.Id }, jobReceivable);
        }

        // DELETE: api/JobReceivables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobReceivable(int id)
        {
            var jobReceivable = await _context.JobReceivables.FindAsync(id);
            if (jobReceivable == null)
            {
                return NotFound();
            }

            _context.JobReceivables.Remove(jobReceivable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobReceivableExists(int id)
        {
            return _context.JobReceivables.Any(e => e.Id == id);
        }
    }
}
