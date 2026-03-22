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
    public class ResourcesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ResourcesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/Resources
        // GET: api/Resources?code=RES001
        // GET: api/Resources?name=John
        // GET: api/Resources?itemTypeId=1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resource>>> GetResources(
            [FromQuery] string? code = null,
            [FromQuery] string? name = null,
            [FromQuery] int? itemTypeId = null)
        {
            var query = _context.Resource.AsQueryable();

            if (!string.IsNullOrEmpty(code))
            {
                query = query.Where(r => r.Code == code);
            }

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(r => r.Name.Contains(name));
            }

            if (itemTypeId.HasValue)
            {
                query = query.Where(r => r.ItemTypeId == itemTypeId.Value);
            }

            return await query.OrderBy(r => r.SortOrder).ThenBy(r => r.Name).ToListAsync();
        }

        // GET: api/Resources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resource>> GetResource(int id)
        {
            var resource = await _context.Resource.FindAsync(id);

            if (resource == null)
            {
                return NotFound();
            }

            return resource;
        }

        // GET: api/Resources/ByCode/{code}
        [HttpGet("ByCode/{code}")]
        public async Task<ActionResult<Resource>> GetResourceByCode(string code)
        {
            var resource = await _context.Resource
                .FirstOrDefaultAsync(r => r.Code == code);

            if (resource == null)
            {
                return NotFound();
            }

            return resource;
        }

        // GET: api/Resources/Active
        [HttpGet("Active")]
        public async Task<ActionResult<IEnumerable<Resource>>> GetActiveResources()
        {
            return await _context.Resource
                .Where(r => r.ItemStatusId == 1) // Assuming 1 is "Active" status
                .OrderBy(r => r.SortOrder)
                .ThenBy(r => r.Name)
                .ToListAsync();
        }

        // GET: api/Resources/ByType/{itemTypeId}
        [HttpGet("ByType/{itemTypeId}")]
        public async Task<ActionResult<IEnumerable<Resource>>> GetResourcesByType(int itemTypeId)
        {
            return await _context.Resource
                .Where(r => r.ItemTypeId == itemTypeId)
                .OrderBy(r => r.SortOrder)
                .ThenBy(r => r.Name)
                .ToListAsync();
        }

        // PUT: api/Resources/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResource(int id, Resource resource)
        {
            if (id != resource.Id)
            {
                return BadRequest();
            }

            _context.Entry(resource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceExists(id))
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

        // POST: api/Resources
        [HttpPost]
        public async Task<ActionResult<Resource>> PostResource(Resource resource)
        {
            _context.Resource.Add(resource);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResource", new { id = resource.Id }, resource);
        }

        // DELETE: api/Resources/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResource(int id)
        {
            var resource = await _context.Resource.FindAsync(id);
            if (resource == null)
            {
                return NotFound();
            }

            _context.Resource.Remove(resource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResourceExists(int id)
        {
            return _context.Resource.Any(e => e.Id == id);
        }
    }
}
