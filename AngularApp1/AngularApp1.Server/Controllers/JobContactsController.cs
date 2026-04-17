using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;
using Erp.Domain.DTOs;
using AngularApp1.Server.Services.RabbitMQ;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobContactsController : ControllerBase
    {
        private readonly ErpDbContext _context;
        private readonly IRabbitMqBasic? _rabbitmq;

        public JobContactsController(ErpDbContext context, IRabbitMqBasic? rabbitmq)
        {
            _context = context;
            _rabbitmq = rabbitmq;
        }

        // GET: api/JobContacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobContactDto>>> GetJobContacts()
        {
            var items = await _context.JobContacts
                .Include(x => x.Contact)
                .Include(x => x.JobMain)
                .ToListAsync();

            var dtos = items.Select(MapToDto).ToList();
            return dtos;
        }

        // GET: api/JobContacts/ByJobMain/5
        [HttpGet("ByJobMain/{jobMainId}")]
        public async Task<ActionResult<IEnumerable<JobContactDto>>> GetJobContactsByJobMain(int jobMainId)
        {
            var items = await _context.JobContacts
                .Where(x => x.JobMainId == jobMainId)
                .Include(x => x.Contact)
                .Include(x => x.JobMain)
                .ToListAsync();

            var dtos = items.Select(MapToDto).ToList();
            return dtos;
        }

        // GET: api/JobContacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobContactDto>> GetJobContact(int id)
        {
            var jc = await _context.JobContacts
                .Include(x => x.Contact)
                .Include(x => x.JobMain)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (jc == null)
            {
                return NotFound();
            }

            return MapToDto(jc);
        }

        // POST: api/JobContacts
        [HttpPost]
        public async Task<ActionResult<JobContactDto>> PostJobContact(JobContact jobContact)
        {
            _context.JobContacts.Add(jobContact);
            await _context.SaveChangesAsync();

            if (_rabbitmq != null)
            {
                _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobContact with ID {jobContact.Id} created." });
            }

            var created = await _context.JobContacts
                .Include(x => x.Contact)
                .Include(x => x.JobMain)
                .FirstOrDefaultAsync(x => x.Id == jobContact.Id);

            var dto = MapToDto(created);
            return CreatedAtAction("GetJobContact", new { id = jobContact.Id }, dto);
        }

        // DELETE: api/JobContacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobContact(int id)
        {
            var jc = await _context.JobContacts.FindAsync(id);
            if (jc == null)
            {
                return NotFound();
            }

            _context.JobContacts.Remove(jc);
            await _context.SaveChangesAsync();

            if (_rabbitmq != null)
            {
                _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobContact with ID {id} deleted." });
            }

            return NoContent();
        }

        private JobContactDto MapToDto(JobContact jc)
        {
            var dto = new JobContactDto
            {
                Id = jc.Id,
                JobMainId = jc.JobMainId,
                ContactId = jc.ContactId,
                IsPrimary = jc.IsPrimary,
                Notes = jc.Notes
            };

            if (jc.Contact != null)
            {
                dto.ContactName = jc.Contact.Name;
                dto.ContactNo1 = jc.Contact.ContactNo1;
                dto.ContactNo2 = jc.Contact.ContactNo2;
                dto.ContactEmail1 = jc.Contact.Email1;
                dto.ContactEmail2 = jc.Contact.Email2;
            }

            return dto;
        }
    }
}
