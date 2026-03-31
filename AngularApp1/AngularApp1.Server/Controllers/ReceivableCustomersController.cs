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
    public class ReceivableCustomersController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ReceivableCustomersController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ReceivableCustomers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceivableCustomer>>> GetReceivableCustomers()
        {
            return await _context.ReceivableCustomers.ToListAsync();
        }

        // GET: api/ReceivableCustomers/byReceivable/5
        [HttpGet("byReceivable/{receivableId}")]
        public async Task<ActionResult<IEnumerable<ReceivableCustomer>>> GetReceivableCustomersByReceivable(int receivableId)
        {
            var customers = await _context.ReceivableCustomers
                .Where(rc => rc.ReceivablesId == receivableId)
                .ToListAsync();

            return customers;
        }

        // GET: api/ReceivableCustomers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceivableCustomer>> GetReceivableCustomer(int id)
        {
            var receivableCustomer = await _context.ReceivableCustomers.FindAsync(id);

            if (receivableCustomer == null)
            {
                return NotFound();
            }

            return receivableCustomer;
        }

        // PUT: api/ReceivableCustomers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceivableCustomer(int id, ReceivableCustomer receivableCustomer)
        {
            if (id != receivableCustomer.Id)
            {
                return BadRequest();
            }

            _context.Entry(receivableCustomer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceivableCustomerExists(id))
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

        // POST: api/ReceivableCustomers
        [HttpPost]
        public async Task<ActionResult<ReceivableCustomer>> PostReceivableCustomer(ReceivableCustomer receivableCustomer)
        {
            _context.ReceivableCustomers.Add(receivableCustomer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceivableCustomer", new { id = receivableCustomer.Id }, receivableCustomer);
        }

        // DELETE: api/ReceivableCustomers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceivableCustomer(int id)
        {
            var receivableCustomer = await _context.ReceivableCustomers.FindAsync(id);
            if (receivableCustomer == null)
            {
                return NotFound();
            }

            _context.ReceivableCustomers.Remove(receivableCustomer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReceivableCustomerExists(int id)
        {
            return _context.ReceivableCustomers.Any(e => e.Id == id);
        }
    }
}
