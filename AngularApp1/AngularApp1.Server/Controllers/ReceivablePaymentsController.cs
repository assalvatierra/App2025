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
    public class ReceivablePaymentsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ReceivablePaymentsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ReceivablePayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceivablePayment>>> GetReceivablePayments()
        {
            return await _context.ReceivablePayments
                .Include(rp => rp.Receivables)
                .Include(rp => rp.Payments)
                .ToListAsync();
        }

        // GET: api/ReceivablePayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceivablePayment>> GetReceivablePayment(int id)
        {
            var receivablePayment = await _context.ReceivablePayments
                .Include(rp => rp.Receivables)
                .Include(rp => rp.Payments)
                .FirstOrDefaultAsync(rp => rp.Id == id);

            if (receivablePayment == null)
            {
                return NotFound();
            }

            return receivablePayment;
        }

        // GET: api/ReceivablePayments/byPayment/5
        [HttpGet("byPayment/{paymentId}")]
        public async Task<ActionResult<IEnumerable<ReceivablePayment>>> GetReceivablePaymentsByPayment(int paymentId)
        {
            var receivablePayments = await _context.ReceivablePayments
                .Where(rp => rp.PaymentsId == paymentId)
                .Include(rp => rp.Receivables)
                .ToListAsync();

            return receivablePayments;
        }

        // GET: api/ReceivablePayments/byReceivable/5
        [HttpGet("byReceivable/{receivableId}")]
        public async Task<ActionResult<IEnumerable<ReceivablePayment>>> GetReceivablePaymentsByReceivable(int receivableId)
        {
            var receivablePayments = await _context.ReceivablePayments
                .Where(rp => rp.ReceivablesId == receivableId)
                .Include(rp => rp.Payments)
                .ToListAsync();

            return receivablePayments;
        }

        // PUT: api/ReceivablePayments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceivablePayment(int id, ReceivablePayment receivablePayment)
        {
            if (id != receivablePayment.Id)
            {
                return BadRequest();
            }

            _context.Entry(receivablePayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceivablePaymentExists(id))
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

        // POST: api/ReceivablePayments
        [HttpPost]
        public async Task<ActionResult<ReceivablePayment>> PostReceivablePayment(ReceivablePayment receivablePayment)
        {
            _context.ReceivablePayments.Add(receivablePayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReceivablePayment), new { id = receivablePayment.Id }, receivablePayment);
        }

        // DELETE: api/ReceivablePayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceivablePayment(int id)
        {
            var receivablePayment = await _context.ReceivablePayments.FindAsync(id);
            if (receivablePayment == null)
            {
                return NotFound();
            }

            _context.ReceivablePayments.Remove(receivablePayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReceivablePaymentExists(int id)
        {
            return _context.ReceivablePayments.Any(e => e.Id == id);
        }
    }
}
