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
    public class RefCitiesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public RefCitiesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/RefCities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RefCity>>> GetRefCity()
        {
            return await _context.RefCity.ToListAsync();
        }

        // GET: api/RefCities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RefCity>> GetRefCity(int id)
        {
            var refCity = await _context.RefCity.FindAsync(id);

            if (refCity == null)
            {
                return NotFound();
            }

            return refCity;
        }

        // PUT: api/RefCities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRefCity(int id, RefCity refCity)
        {
            if (id != refCity.Id)
            {
                return BadRequest();
            }

            _context.Entry(refCity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RefCityExists(id))
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

        // POST: api/RefCities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RefCity>> PostRefCity(RefCity refCity)
        {
            _context.RefCity.Add(refCity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRefCity", new { id = refCity.Id }, refCity);
        }

        // DELETE: api/RefCities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRefCity(int id)
        {
            var refCity = await _context.RefCity.FindAsync(id);
            if (refCity == null)
            {
                return NotFound();
            }

            _context.RefCity.Remove(refCity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RefCityExists(int id)
        {
            return _context.RefCity.Any(e => e.Id == id);
        }
    }
}
