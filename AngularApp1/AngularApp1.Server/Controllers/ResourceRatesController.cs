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
    public class ResourceRatesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ResourceRatesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ResourceRates
        // GET: api/ResourceRates?resourceId=1
        // GET: api/ResourceRates?isActive=true
        // GET: api/ResourceRates?validFrom=2024-01-01&validTo=2024-12-31
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResourceRate>>> GetResourceRates(
            [FromQuery] int? resourceId = null,
            [FromQuery] bool? isActive = null,
            [FromQuery] DateTime? validFrom = null,
            [FromQuery] DateTime? validTo = null)
        {
            var query = _context.ResourceRates.AsQueryable();

            if (resourceId.HasValue)
            {
                query = query.Where(rr => rr.ResourceId == resourceId.Value);
            }

            if (isActive.HasValue)
            {
                query = query.Where(rr => rr.IsActive == isActive.Value);
            }

            if (validFrom.HasValue)
            {
                query = query.Where(rr => rr.ValidTo >= validFrom.Value);
            }

            if (validTo.HasValue)
            {
                query = query.Where(rr => rr.ValidFrom <= validTo.Value);
            }

            var resourceRates = await query
                .OrderBy(rr => rr.ResourceId)
                .ThenByDescending(rr => rr.ValidFrom)
                .ToListAsync();

            return Ok(resourceRates);
        }

        // GET: api/ResourceRates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResourceRate>> GetResourceRate(int id)
        {
            var resourceRate = await _context.ResourceRates.FindAsync(id);

            if (resourceRate == null)
            {
                return NotFound();
            }

            return resourceRate;
        }

        // GET: api/ResourceRates/ByResource/{resourceId}
        [HttpGet("ByResource/{resourceId}")]
        public async Task<ActionResult<IEnumerable<ResourceRate>>> GetResourceRatesByResource(int resourceId)
        {
            var resourceRates = await _context.ResourceRates
                .Where(rr => rr.ResourceId == resourceId)
                .OrderByDescending(rr => rr.ValidFrom)
                .ToListAsync();

            return Ok(resourceRates);
        }

        // GET: api/ResourceRates/Active/{resourceId}
        [HttpGet("Active/{resourceId}")]
        public async Task<ActionResult<ResourceRate>> GetActiveResourceRate(int resourceId)
        {
            var currentDate = DateTime.UtcNow.Date;

            var resourceRate = await _context.ResourceRates
                .Where(rr => rr.ResourceId == resourceId &&
                            rr.IsActive == true &&
                            rr.ValidFrom <= currentDate &&
                            rr.ValidTo >= currentDate)
                .OrderByDescending(rr => rr.CreatedOn)
                .FirstOrDefaultAsync();

            if (resourceRate == null)
            {
                return NotFound();
            }

            return resourceRate;
        }

        // PUT: api/ResourceRates/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResourceRate(int id, ResourceRate resourceRate)
        {
            if (id != resourceRate.Id)
            {
                return BadRequest();
            }

            _context.Entry(resourceRate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceRateExists(id))
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

        // POST: api/ResourceRates
        [HttpPost]
        public async Task<ActionResult<ResourceRate>> PostResourceRate(ResourceRate resourceRate)
        {
            // Set audit fields
            resourceRate.CreatedOn = DateTime.UtcNow;
            resourceRate.LastEditOn = DateTime.UtcNow;

            _context.ResourceRates.Add(resourceRate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResourceRate", new { id = resourceRate.Id }, resourceRate);
        }

        // DELETE: api/ResourceRates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResourceRate(int id)
        {
            var resourceRate = await _context.ResourceRates.FindAsync(id);
            if (resourceRate == null)
            {
                return NotFound();
            }

            _context.ResourceRates.Remove(resourceRate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResourceRateExists(int id)
        {
            return _context.ResourceRates.Any(e => e.Id == id);
        }
    }
}