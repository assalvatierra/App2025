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
    public class JobMainsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public JobMainsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/JobMains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobMain>>> GetJobMain()
        {
            return await _context.JobMain.ToListAsync();
        }

        // GET: api/JobMains/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobMain>> GetJobMain(int id)
        {
            var jobMain = await _context.JobMain.FindAsync(id);

            if (jobMain == null)
            {
                return NotFound();
            }

            return jobMain;
        }

        // PUT: api/JobMains/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobMain(int id, JobMain jobMain)
        {
            if (id != jobMain.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobMain).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobMainExists(id))
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

        // POST: api/JobMains
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JobMain>> PostJobMain(JobMain jobMain)
        {
            _context.JobMain.Add(jobMain);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobMain", new { id = jobMain.Id }, jobMain);
        }

        // DELETE: api/JobMains/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobMain(int id)
        {
            var jobMain = await _context.JobMain.FindAsync(id);
            if (jobMain == null)
            {
                return NotFound();
            }

            _context.JobMain.Remove(jobMain);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobMainExists(int id)
        {
            return _context.JobMain.Any(e => e.Id == id);
        }
    }
}
