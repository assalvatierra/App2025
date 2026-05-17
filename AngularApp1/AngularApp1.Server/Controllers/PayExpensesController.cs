using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayExpensesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public PayExpensesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/PayExpenses/byExpense/5
        [HttpGet("byExpense/{expenseId}")]
        public async Task<ActionResult<IEnumerable<PayExpense>>> GetPayExpensesByExpense(int expenseId)
        {
            return await _context.PayExpenses
                .Where(pe => pe.ExpenseId == expenseId)
                .ToListAsync();
        }

        // GET: api/PayExpenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayExpense>> GetPayExpense(int id)
        {
            var payExpense = await _context.PayExpenses.FindAsync(id);
            if (payExpense == null)
                return NotFound();

            return payExpense;
        }

        // POST: api/PayExpenses
        [HttpPost]
        public async Task<ActionResult<PayExpense>> PostPayExpense(PayExpense payExpense)
        {
            _context.PayExpenses.Add(payExpense);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayExpense), new { id = payExpense.Id }, payExpense);
        }

        // PUT: api/PayExpenses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayExpense(int id, PayExpense payExpense)
        {
            if (id != payExpense.Id)
                return BadRequest();

            _context.Entry(payExpense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.PayExpenses.Any(e => e.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/PayExpenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayExpense(int id)
        {
            var payExpense = await _context.PayExpenses.FindAsync(id);
            if (payExpense == null)
                return NotFound();

            _context.PayExpenses.Remove(payExpense);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
