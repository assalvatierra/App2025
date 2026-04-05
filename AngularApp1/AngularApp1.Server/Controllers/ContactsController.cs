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
    public class ContactsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ContactsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContact()
        {
            return await _context.Contact.ToListAsync();
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contact.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            // Fetch the existing contact from the database with tracking disabled for the query
            var existingContact = await _context.Contact.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
            if (existingContact == null)
            {
                return NotFound();
            }

            // Create an updated contact with preserved audit fields
            var updatedContact = new Contact
            {
                Id = id,
                Name = contact.Name,
                Remarks = contact.Remarks,
                ContactNo1 = contact.ContactNo1,
                ContactNo2 = contact.ContactNo2,
                Address1 = contact.Address1,
                Address2 = contact.Address2,
                Email1 = contact.Email1,
                Email2 = contact.Email2,
                IsArchived = contact.IsArchived,
                IsPrivate = contact.IsPrivate,
                IsActive = contact.IsActive,
                TypeId = contact.TypeId,
                StatusId = contact.StatusId,
                RefCityId = contact.RefCityId,
                // Preserve original audit fields
                CreatedBy = existingContact.CreatedBy,
                CreatedOn = existingContact.CreatedOn,
                // Update last edit fields
                LastEditBy = "System", // TODO: Replace with actual user
                LastEditOn = DateTime.Now
            };

            _context.Entry(updatedContact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
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

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            // Set audit fields for new contact
            contact.CreatedBy = "System"; // TODO: Replace with actual user
            contact.CreatedOn = DateTime.Now;
            contact.LastEditBy = "System"; // TODO: Replace with actual user
            contact.LastEditOn = DateTime.Now;

            _context.Contact.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contact.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contact.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contact.Any(e => e.Id == id);
        }
    }
}
