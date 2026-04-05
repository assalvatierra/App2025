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
    public class EntityContactsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public EntityContactsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/EntityContacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntityContact>>> GetEntityContact()
        {
            return await _context.EntityContact
                .Include(ec => ec.Entity)
                .Include(ec => ec.Contact)
                .ToListAsync();
        }

        // GET: api/EntityContacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EntityContact>> GetEntityContact(int id)
        {
            var entityContact = await _context.EntityContact
                .Include(ec => ec.Entity)
                .Include(ec => ec.Contact)
                .FirstOrDefaultAsync(ec => ec.Id == id);

            if (entityContact == null)
            {
                return NotFound();
            }

            return entityContact;
        }

        // GET: api/EntityContacts/ByContact/5
        [HttpGet("ByContact/{contactId}")]
        public async Task<ActionResult<IEnumerable<EntityContact>>> GetEntityContactsByContactId(int contactId)
        {
            var entityContacts = await _context.EntityContact
                .Include(ec => ec.Entity)
                .Where(ec => ec.ContactId == contactId)
                .ToListAsync();

            return entityContacts;
        }

        // GET: api/EntityContacts/ByEntity/5
        [HttpGet("ByEntity/{entityId}")]
        public async Task<ActionResult<IEnumerable<EntityContact>>> GetEntityContactsByEntityId(int entityId)
        {
            var entityContacts = await _context.EntityContact
                .Include(ec => ec.Contact)
                .Where(ec => ec.EntityId == entityId)
                .ToListAsync();

            return entityContacts;
        }

        // PUT: api/EntityContacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntityContact(int id, EntityContact entityContact)
        {
            if (id != entityContact.Id)
            {
                return BadRequest("ID mismatch");
            }

            _context.Entry(entityContact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityContactExists(id))
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

        // POST: api/EntityContacts
        [HttpPost]
        public async Task<ActionResult<EntityContact>> PostEntityContact(EntityContact entityContact)
        {
            try
            {
                _context.EntityContact.Add(entityContact);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEntityContact", new { id = entityContact.Id }, entityContact);
            }
            catch (DbUpdateException ex)
            {
                return BadRequest($"Error saving entity contact: {ex.InnerException?.Message ?? ex.Message}");
            }
        }

        // DELETE: api/EntityContacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntityContact(int id)
        {
            var entityContact = await _context.EntityContact.FindAsync(id);
            if (entityContact == null)
            {
                return NotFound();
            }

            _context.EntityContact.Remove(entityContact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EntityContactExists(int id)
        {
            return _context.EntityContact.Any(e => e.Id == id);
        }
    }
}
