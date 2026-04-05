using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;
using AngularApp1.Server.DTOs;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public PaymentsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return await _context.Payments
                .Include(p => p.Entity)
                .Include(p => p.ReceivablePayments)
                .Include(p => p.ExpensePayments)
                .OrderByDescending(p => p.TrxDate)
                .ToListAsync();
        }

        // GET: api/Payments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _context.Payments
                .Include(p => p.Entity)
                .Include(p => p.ReceivablePayments)
                .Include(p => p.ExpensePayments)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (payment == null)
            {
                return NotFound(new { message = $"Payment with ID {id} not found." });
            }

            return Ok(payment);
        }

        // GET: api/Payments/byEntity/5
        [HttpGet("byEntity/{entityId}")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPaymentsByEntity(int entityId)
        {
            var payments = await _context.Payments
                .Where(p => p.EntityId == entityId)
                .Include(p => p.Entity)
                .Include(p => p.ReceivablePayments)
                .Include(p => p.ExpensePayments)
                .OrderByDescending(p => p.TrxDate)
                .ToListAsync();

            return payments;
        }

        // POST: api/Payments
        [HttpPost]
        public async Task<ActionResult<Payment>> PostPayment([FromBody] CreatePaymentDto paymentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map DTO to entity
            var payment = new Payment
            {
                TrxDate = paymentDto.TrxDate,
                Amount = paymentDto.Amount,
                Remarks = paymentDto.Remarks ?? string.Empty,
                IsArchived = paymentDto.IsArchived,
                IsPrivate = paymentDto.IsPrivate,
                IsActive = paymentDto.IsActive,
                EntityId = paymentDto.EntityId,
                ItemTypeId = paymentDto.ItemTypeId,
                ItemStatusId = paymentDto.ItemStatusId,
                AdditionalInfo = paymentDto.AdditionalInfo,
                
                // Set server-managed fields
                CreatedBy = User?.Identity?.Name ?? "System",
                LastEditBy = User?.Identity?.Name ?? "System",
                CreatedOn = DateTime.Now,
                LastEditOn = DateTime.Now
            };

            // Handle navigation properties if provided
            if (paymentDto.ReceivablePayments != null && paymentDto.ReceivablePayments.Any())
            {
                payment.ReceivablePayments = paymentDto.ReceivablePayments
                    .Select(rp => new ReceivablePayment
                    {
                        ReceivablesId = rp.ReceivablesId
                    }).ToList();
            }

            if (paymentDto.ExpensePayments != null && paymentDto.ExpensePayments.Any())
            {
                payment.ExpensePayments = paymentDto.ExpensePayments
                    .Select(ep => new ExpensePayment
                    {
                        ExpensesId = ep.ExpensesId
                    }).ToList();
            }

            _context.Payments.Add(payment);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { 
                    message = "Error saving payment to database.", 
                    error = ex.InnerException?.Message ?? ex.Message 
                });
            }

            // Return the created payment with its ID
            return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
        }

        // PUT: api/Payments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayment(int id, [FromBody] UpdatePaymentDto paymentDto)
        {
            if (id != paymentDto.Id)
            {
                return BadRequest(new { message = "Payment ID mismatch." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Preserve CreatedBy and CreatedOn from database
            var existingPayment = await _context.Payments.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
            if (existingPayment == null)
            {
                return NotFound(new { message = $"Payment with ID {id} not found." });
            }

            // Map DTO to entity, preserving server-managed fields
            var payment = new Payment
            {
                Id = paymentDto.Id,
                TrxDate = paymentDto.TrxDate,
                Amount = paymentDto.Amount,
                Remarks = paymentDto.Remarks ?? string.Empty,
                IsArchived = paymentDto.IsArchived,
                IsPrivate = paymentDto.IsPrivate,
                IsActive = paymentDto.IsActive,
                EntityId = paymentDto.EntityId,
                ItemTypeId = paymentDto.ItemTypeId,
                ItemStatusId = paymentDto.ItemStatusId,
                AdditionalInfo = paymentDto.AdditionalInfo,
                CreatedBy = existingPayment.CreatedBy,
                CreatedOn = existingPayment.CreatedOn,
                LastEditBy = User?.Identity?.Name ?? "System",
                LastEditOn = DateTime.Now
            };

            _context.Entry(payment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
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

        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Payments/5/archive
        [HttpPatch("{id}/archive")]
        public async Task<IActionResult> ArchivePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            payment.IsArchived = true;
            payment.IsActive = false;
            payment.LastEditBy = User?.Identity?.Name ?? "System";
            payment.LastEditOn = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Payments/5/activate
        [HttpPatch("{id}/activate")]
        public async Task<IActionResult> ActivatePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            payment.IsActive = true;
            payment.LastEditBy = User?.Identity?.Name ?? "System";
            payment.LastEditOn = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentExists(int id)
        {
            return _context.Payments.Any(p => p.Id == id);
        }
    }
}
