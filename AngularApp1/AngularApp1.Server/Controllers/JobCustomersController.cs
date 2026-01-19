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
    public class JobCustomersController : ControllerBase
    {
        private readonly ErpDbContext _context;
        private readonly IRabbitMqBasic? _rabbitmq;

        public JobCustomersController(ErpDbContext context, IRabbitMqBasic? rabbitmq)
        {
            _context = context;
            _rabbitmq = rabbitmq;
        }

        // GET: api/JobCustomers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobCustomerDto>>> GetJobCustomer()
        {
            var jobCustomers = await _context.JobCustomers
                .Include(x => x.Customer)
                .Include(x => x.JobMain)
                .ToListAsync();

            var dtos = jobCustomers.Select(MapToDto).ToList();
            return dtos;
        }

        // GET: api/JobCustomers/ByJobMain/5
        // This route must be defined BEFORE the {id} route to ensure correct matching
        [HttpGet("ByJobMain/{jobMainId}")]
        public async Task<ActionResult<IEnumerable<JobCustomerDto>>> GetJobCustomersByJobMain(int jobMainId)
        {
            var jobCustomers = await _context.JobCustomers
                .Where(x => x.JobMainId == jobMainId)
                .Include(x => x.Customer)
                .Include(x => x.JobMain)
                .ToListAsync();

            // Return empty list instead of NotFound for consistency
            var dtos = jobCustomers.Select(MapToDto).ToList();
            return dtos;
        }

        // GET: api/JobCustomers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobCustomerDto>> GetJobCustomer(int id)
        {
            var jobCustomer = await _context.JobCustomers
                .Include(x => x.Customer)
                .Include(x => x.JobMain)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (jobCustomer == null)
            {
                return NotFound();
            }

            return MapToDto(jobCustomer);
        }

        // PUT: api/JobCustomers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobCustomer(int id, JobCustomer jobCustomer)
        {
            if (id != jobCustomer.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobCustomer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                //Send Message to RabbitMQ
                if (_rabbitmq != null)
                {
                    _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobCustomer with ID {jobCustomer.Id} updated." });
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobCustomerExists(id))
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

        // POST: api/JobCustomers
        [HttpPost]
        public async Task<ActionResult<JobCustomerDto>> PostJobCustomer(JobCustomer jobCustomer)
        {
            _context.JobCustomers.Add(jobCustomer);
            await _context.SaveChangesAsync();

            //Send Message to RabbitMQ
            if (_rabbitmq != null)
            {
                _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobCustomer with ID {jobCustomer.Id} created." });
            }

            var createdJobCustomer = await _context.JobCustomers
                .Include(x => x.Customer)
                .Include(x => x.JobMain)
                .FirstOrDefaultAsync(x => x.Id == jobCustomer.Id);

            var dto = MapToDto(createdJobCustomer);
            return CreatedAtAction("GetJobCustomer", new { id = jobCustomer.Id }, dto);
        }

        // DELETE: api/JobCustomers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobCustomer(int id)
        {
            var jobCustomer = await _context.JobCustomers.FindAsync(id);
            if (jobCustomer == null)
            {
                return NotFound();
            }

            _context.JobCustomers.Remove(jobCustomer);
            await _context.SaveChangesAsync();

            //Send Message to RabbitMQ
            if (_rabbitmq != null)
            {
                _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobCustomer with ID {id} deleted." });
            }

            return NoContent();
        }

        private bool JobCustomerExists(int id)
        {
            return _context.JobCustomers.Any(e => e.Id == id);
        }

        private JobCustomerDto MapToDto(JobCustomer jobCustomer)
        {
            var dto = new JobCustomerDto
            {
                // JobCustomer Properties
                Id = jobCustomer.Id,
                JobMainId = jobCustomer.JobMainId,
                CustomerId = jobCustomer.CustomerId,
                IsPrimary = jobCustomer.IsPrimary,
                IsBillTo = jobCustomer.IsBillTo,
                Notes = jobCustomer.Notes
            };

            // Entity (Customer) Properties
            if (jobCustomer.Customer != null)
            {
                dto.CustomerName = jobCustomer.Customer.Name;
                dto.CustomerDescription = jobCustomer.Customer.Description;
                dto.CustomerRemarks = jobCustomer.Customer.Remarks;
                dto.CustomerCode = jobCustomer.Customer.Code;
                dto.CustomerSortOrder = jobCustomer.Customer.SortOrder;
                dto.CustomerContactNo1 = jobCustomer.Customer.ContactNo1;
                dto.CustomerContactNo2 = jobCustomer.Customer.ContactNo2;
                dto.CustomerAddress1 = jobCustomer.Customer.Address1;
                dto.CustomerAddress2 = jobCustomer.Customer.Address2;
                dto.CustomerEmail1 = jobCustomer.Customer.Email1;
                dto.CustomerEmail2 = jobCustomer.Customer.Email2;
                dto.CustomerCreatedBy = jobCustomer.Customer.CreatedBy;
                dto.CustomerCreatedOn = jobCustomer.Customer.CreatedOn;
                dto.CustomerLastEditBy = jobCustomer.Customer.LastEditBy;
                dto.CustomerLastEditOn = jobCustomer.Customer.LastEditOn;
                dto.CustomerIsArchived = jobCustomer.Customer.IsArchived;
                dto.CustomerIsPrivate = jobCustomer.Customer.IsPrivate;
                dto.CustomerIsActive = jobCustomer.Customer.IsActive;
                dto.CustomerEntityTypeId = jobCustomer.Customer.EntityTypeId;
                dto.CustomerEntityStatusId = jobCustomer.Customer.EntityStatusId;
                dto.CustomerBusinessUnitId = jobCustomer.Customer.BusinessUnitId;
                dto.CustomerRefCityId = jobCustomer.Customer.RefCityId;
            }

            return dto;
        }
    }
}
