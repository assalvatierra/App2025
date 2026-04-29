using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobScheduleController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public JobScheduleController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/JobSchedule
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobSchedule>>> Get()
        {
            return await _context.Set<JobSchedule>().ToListAsync();
        }

        // GET: api/JobSchedule/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobSchedule>> Get(int id)
        {
            var entity = await _context.Set<JobSchedule>().FindAsync(id);
            if (entity == null) return NotFound();
            return entity;
        }

        // GET: api/JobSchedule/ByJobService/5
        [HttpGet("ByJobService/{jobServiceId}")]
        public async Task<ActionResult<IEnumerable<JobSchedule>>> GetByJobService(int jobServiceId)
        {
            var list = await _context.Set<JobSchedule>()
                .Where(js => js.JobServiceId.HasValue && js.JobServiceId.Value == jobServiceId)
                .ToListAsync();

            return Ok(list);
        }

        // POST: api/JobSchedule
        [HttpPost]
        public async Task<ActionResult<JobSchedule>> Post([FromBody] JobSchedule jobSchedule)
        {
            _context.Set<JobSchedule>().Add(jobSchedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = jobSchedule.Id }, jobSchedule);
        }

        // PUT: api/JobSchedule/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] JobSchedule jobSchedule)
        {
            if (id != jobSchedule.Id) return BadRequest();

            _context.Entry(jobSchedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobScheduleExists(id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/JobSchedule/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.Set<JobSchedule>().FindAsync(id);
            if (entity == null) return NotFound();

            _context.Set<JobSchedule>().Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobScheduleExists(int id)
        {
            return _context.Set<JobSchedule>().Any(e => e.Id == id);
        }
    }
}
