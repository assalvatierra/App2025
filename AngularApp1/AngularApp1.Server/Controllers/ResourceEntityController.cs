using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceEntityController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ResourceEntityController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ResourceEntity
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetResourceEntities()
        {
            var resourceEntities = await _context.ResourceEntity
                .Include(re => re.Entity)
                    .ThenInclude(e => e.EntityStatus)
                .Select(re => new
                {
                    re.Id,
                    re.ResourceId,
                    re.EntityId,
                    Entity = re.Entity != null ? new
                    {
                        re.Entity.Id,
                        re.Entity.Name,
                        re.Entity.Code,
                        re.Entity.Description,
                        re.Entity.Remarks,
                        Status = re.Entity.EntityStatus != null ? new
                        {
                            re.Entity.EntityStatus.Id,
                            re.Entity.EntityStatus.Name
                        } : null
                    } : null
                })
                .ToListAsync();

            return Ok(resourceEntities);
        }

        // GET: api/ResourceEntity/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetResourceEntity(int id)
        {
            var resourceEntity = await _context.ResourceEntity
                .Include(re => re.Entity)
                    .ThenInclude(e => e.EntityStatus)
                .Where(re => re.Id == id)
                .Select(re => new
                {
                    re.Id,
                    re.ResourceId,
                    re.EntityId,
                    Entity = re.Entity != null ? new
                    {
                        re.Entity.Id,
                        re.Entity.Name,
                        re.Entity.Code,
                        re.Entity.Description,
                        re.Entity.Remarks,
                        Status = re.Entity.EntityStatus != null ? new
                        {
                            re.Entity.EntityStatus.Id,
                            re.Entity.EntityStatus.Name
                        } : null
                    } : null
                })
                .FirstOrDefaultAsync();

            if (resourceEntity == null)
            {
                return NotFound();
            }

            return resourceEntity;
        }

        // GET: api/ResourceEntity/ByResource/5
        [HttpGet("ByResource/{resourceId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetByResource(int resourceId)
        {
            try
            {
                var resourceEntities = await _context.ResourceEntity
                    .Include(re => re.Entity)
                        .ThenInclude(e => e.EntityStatus)
                    .Where(re => re.ResourceId == resourceId)
                    .Select(re => new
                    {
                        re.Id,
                        re.ResourceId,
                        re.EntityId,
                        Entity = re.Entity != null ? new
                        {
                            re.Entity.Id,
                            re.Entity.Name,
                            re.Entity.Code,
                            re.Entity.Description,
                            re.Entity.Remarks,
                            Status = re.Entity.EntityStatus != null ? new
                            {
                                re.Entity.EntityStatus.Id,
                                re.Entity.EntityStatus.Name
                            } : null
                        } : null
                    })
                    .ToListAsync();

                return Ok(resourceEntities);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetByResource: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "An error occurred while retrieving resource entities.", error = ex.Message });
            }
        }

        // GET: api/ResourceEntity/ByEntity/5
        [HttpGet("ByEntity/{entityId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetByEntity(int entityId)
        {
            var resourceEntities = await _context.ResourceEntity
                .Where(re => re.EntityId == entityId)
                .Select(re => new
                {
                    re.Id,
                    re.ResourceId,
                    re.EntityId
                })
                .ToListAsync();

            return Ok(resourceEntities);
        }

        // PUT: api/ResourceEntity/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResourceEntity(int id, ResourceEntity resourceEntity)
        {
            if (id != resourceEntity.Id)
            {
                return BadRequest();
            }

            _context.Entry(resourceEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceEntityExists(id))
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

        // POST: api/ResourceEntity
        [HttpPost]
        public async Task<ActionResult<ResourceEntity>> PostResourceEntity(ResourceEntity resourceEntity)
        {
            try
            {
                Console.WriteLine("=== POST ResourceEntity Debug Info ===");
                Console.WriteLine($"Incoming ResourceEntity:");
                Console.WriteLine($"  ResourceId: {resourceEntity.ResourceId}");
                Console.WriteLine($"  EntityId: {resourceEntity.EntityId}");

                // VALIDATION: Check if ResourceId exists
                if (resourceEntity.ResourceId.HasValue)
                {
                    var resourceExists = await _context.Resource.AnyAsync(r => r.Id == resourceEntity.ResourceId.Value);
                    Console.WriteLine($"  Resource exists: {resourceExists}");

                    if (!resourceExists)
                    {
                        return BadRequest(new
                        {
                            error = "Invalid ResourceId",
                            message = $"Resource with Id {resourceEntity.ResourceId} does not exist"
                        });
                    }
                }
                else
                {
                    return BadRequest(new
                    {
                        error = "ResourceId is required",
                        message = "ResourceId cannot be null"
                    });
                }

                // VALIDATION: Check if EntityId exists
                if (resourceEntity.EntityId.HasValue)
                {
                    var entityExists = await _context.Entity.AnyAsync(e => e.Id == resourceEntity.EntityId.Value);
                    Console.WriteLine($"  Entity exists: {entityExists}");

                    if (!entityExists)
                    {
                        return BadRequest(new
                        {
                            error = "Invalid EntityId",
                            message = $"Entity with Id {resourceEntity.EntityId} does not exist"
                        });
                    }
                }
                else
                {
                    return BadRequest(new
                    {
                        error = "EntityId is required",
                        message = "EntityId cannot be null"
                    });
                }

                // VALIDATION: Check for duplicate
                var duplicateExists = await _context.ResourceEntity
                    .AnyAsync(re => re.ResourceId == resourceEntity.ResourceId
                                 && re.EntityId == resourceEntity.EntityId);

                Console.WriteLine($"  Duplicate exists: {duplicateExists}");

                if (duplicateExists)
                {
                    return BadRequest(new
                    {
                        error = "Duplicate entry",
                        message = "This resource-entity relationship already exists"
                    });
                }

                // Add to context
                _context.ResourceEntity.Add(resourceEntity);
                Console.WriteLine("Entity added to context");

                // Save changes
                Console.WriteLine("Attempting to save changes...");
                await _context.SaveChangesAsync();
                Console.WriteLine($"Save successful! Generated Id: {resourceEntity.Id}");

                Console.WriteLine("=== POST ResourceEntity Success ===");
                return CreatedAtAction("GetResourceEntity", new { id = resourceEntity.Id }, resourceEntity);
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine("=== DbUpdateException ===");
                Console.WriteLine($"Error: {dbEx.Message}");
                Console.WriteLine($"Inner Exception: {dbEx.InnerException?.Message}");
                Console.WriteLine($"Stack Trace: {dbEx.StackTrace}");

                return StatusCode(500, new
                {
                    error = "Database update error",
                    message = dbEx.Message,
                    innerError = dbEx.InnerException?.Message,
                    details = "Check console logs for full stack trace"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("=== General Exception ===");
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                return StatusCode(500, new
                {
                    error = "Server error",
                    message = ex.Message,
                    innerError = ex.InnerException?.Message,
                    details = "Check console logs for full stack trace"
                });
            }
        }

        // DELETE: api/ResourceEntity/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResourceEntity(int id)
        {
            var resourceEntity = await _context.ResourceEntity.FindAsync(id);
            if (resourceEntity == null)
            {
                return NotFound();
            }

            _context.ResourceEntity.Remove(resourceEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResourceEntityExists(int id)
        {
            return _context.ResourceEntity.Any(e => e.Id == id);
        }
    }
}
