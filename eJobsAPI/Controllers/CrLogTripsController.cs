using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eJobs.Data;
using eJobs.Model;
//using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
//using static System.Runtime.InteropServices.JavaScript.JSType;
using eJobsAPI.Data;
using eJobsAPI.Services;

namespace eJobsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrLogTripsController : ControllerBase
    {
        private readonly JobDbContext _context;
        private ITripLogServices _tripLogServices;

        public CrLogTripsController(JobDbContext context, ITripLogServices tripLogServices)
        {
            _context = context;
            _tripLogServices = tripLogServices;

        }


        // GET: api/CrLogTrips/today
        [HttpGet("DateRange/{dtFrom}/{dtTo}")]
        public async Task<ActionResult<IEnumerable<TripLogData>>> ByDateRange(System.DateTime dtFrom, System.DateTime dtTo)
        {
            return await _tripLogServices.GetTripLogsByDate(dtFrom,dtTo);
        }

        [HttpGet("today")]
        public async Task<ActionResult<IEnumerable<TripLogData>>> today()
        {


            return await _tripLogServices.GetTripLogsToday();

        }




        // GET: api/CrLogTrips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CrLogTrip>>> GetCrLogTrip()
        {


            return await _context.CrLogTrips.ToListAsync();
        }

        // GET: api/CrLogTrips/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CrLogTrip>> GetCrLogTrip(int id)
        {
            var crLogTrip = await _context.CrLogTrips.FindAsync(id);

            if (crLogTrip == null)
            {
                return NotFound();
            }

            return crLogTrip;
        }

        // PUT: api/CrLogTrips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCrLogTrip(int id, CrLogTrip crLogTrip)
        {
            if (id != crLogTrip.Id)
            {
                return BadRequest();
            }

            _context.Entry(crLogTrip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CrLogTripExists(id))
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

        // POST: api/CrLogTrips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CrLogTrip>> PostCrLogTrip(CrLogTrip crLogTrip)
        {
            _context.CrLogTrips.Add(crLogTrip);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCrLogTrip", new { id = crLogTrip.Id }, crLogTrip);
        }

        // DELETE: api/CrLogTrips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrLogTrip(int id)
        {
            var crLogTrip = await _context.CrLogTrips.FindAsync(id);
            if (crLogTrip == null)
            {
                return NotFound();
            }

            _context.CrLogTrips.Remove(crLogTrip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CrLogTripExists(int id)
        {
            return _context.CrLogTrips.Any(e => e.Id == id);
        }
    }
}
