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
    public class ExpensePaymentsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ExpensePaymentsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ExpensePayments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpensePayment>>> GetExpensePayments()
        {
            return await _context.ExpensePayments
                .Include(ep => ep.Expenses)
                .Include(ep => ep.Payments)
                .ToListAsync();
        }

        // GET: api/ExpensePayments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpensePayment>> GetExpensePayment(int id)
        {
            var expensePayment = await _context.ExpensePayments
                .Include(ep => ep.Expenses)
                .Include(ep => ep.Payments)
                .FirstOrDefaultAsync(ep => ep.Id == id);

            if (expensePayment == null)
            {
                return NotFound();
            }

            return expensePayment;
        }

        // GET: api/ExpensePayments/byPayment/5
        [HttpGet("byPayment/{paymentId}")]
        public async Task<ActionResult<IEnumerable<ExpensePayment>>> GetExpensePaymentsByPayment(int paymentId)
        {
            var expensePayments = await _context.ExpensePayments
                .Where(ep => ep.PaymentsId == paymentId)
                .Include(ep => ep.Expenses)
                .ToListAsync();

            return expensePayments;
        }

        // GET: api/ExpensePayments/byExpense/5
        [HttpGet("byExpense/{expenseId}")]
        public async Task<ActionResult<IEnumerable<ExpensePayment>>> GetExpensePaymentsByExpense(int expenseId)
        {
            var expensePayments = await _context.ExpensePayments
                .Where(ep => ep.ExpensesId == expenseId)
                .Include(ep => ep.Payments)
                .ToListAsync();

            return expensePayments;
        }

        // PUT: api/ExpensePayments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpensePayment(int id, ExpensePayment expensePayment)
        {
            if (id != expensePayment.Id)
            {
                return BadRequest();
            }

            _context.Entry(expensePayment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpensePaymentExists(id))
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

        // POST: api/ExpensePayments
        [HttpPost]
        public async Task<ActionResult<ExpensePayment>> PostExpensePayment(ExpensePayment expensePayment)
        {
            _context.ExpensePayments.Add(expensePayment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExpensePayment), new { id = expensePayment.Id }, expensePayment);
        }

        // DELETE: api/ExpensePayments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpensePayment(int id)
        {
            var expensePayment = await _context.ExpensePayments.FindAsync(id);
            if (expensePayment == null)
            {
                return NotFound();
            }

            _context.ExpensePayments.Remove(expensePayment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExpensePaymentExists(int id)
        {
            return _context.ExpensePayments.Any(e => e.Id == id);
        }
    }
}
