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
    public class EntitiesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public EntitiesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/Entities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entity>>> GetEntity()
        {
            return await _context.Entity.ToListAsync();
        }

        // GET: api/Entities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Entity>> GetEntity(int id)
        {
            var entity = await _context.Entity.FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }

        // PUT: api/Entities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntity(int id, Entity entity)
        {
            if (id != entity.Id)
            {
                return BadRequest("ID mismatch");
            }

            try
            {
                // Validate required fields
                if (string.IsNullOrWhiteSpace(entity.Name))
                {
                    return BadRequest("Entity name is required");
                }

                // Update audit fields
                entity.LastEditBy = User?.Identity?.Name ?? "System";
                entity.LastEditOn = DateTime.Now;

                _context.Entry(entity).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(id))
                {
                    return NotFound();
                }
                return BadRequest("Concurrency error: The entity was modified by another user");
            }
            catch (DbUpdateException ex)
            {
                return BadRequest($"Error updating entity: {ex.InnerException?.Message ?? ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/Entities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Entity>> PostEntity(Entity entity)
        {
            try
            {
                // Validate required fields
                if (string.IsNullOrWhiteSpace(entity.Name))
                {
                    return BadRequest("Entity name is required");
                }

                if (string.IsNullOrWhiteSpace(entity.CreatedBy))
                {
                    entity.CreatedBy = User?.Identity?.Name ?? "System";
                }

                if (string.IsNullOrWhiteSpace(entity.LastEditBy))
                {
                    entity.LastEditBy = User?.Identity?.Name ?? "System";
                }

                if (entity.CreatedOn == default)
                {
                    entity.CreatedOn = DateTime.Now;
                }

                if (entity.LastEditOn == default)
                {
                    entity.LastEditOn = DateTime.Now;
                }

                _context.Entity.Add(entity);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEntity", new { id = entity.Id }, entity);
            }
            catch (DbUpdateException ex)
            {
                return BadRequest($"Error saving entity: {ex.InnerException?.Message ?? ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE: api/Entities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntity(int id)
        {
            var entity = await _context.Entity.FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            _context.Entity.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntityExists(int id)
        {
            return _context.Entity.Any(e => e.Id == id);
        }
    }
}
