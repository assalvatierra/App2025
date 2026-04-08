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
    public class ExpensesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ExpensesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/Expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            return await _context.Expenses
                .Include(e => e.ExpenseStatuses)
                .Include(e => e.ItemType)
                .ToListAsync();
        }

        // GET: api/Expenses/byEntity/5
        [HttpGet("byEntity/{entityId}")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpensesByEntity(int entityId)
        {
            var expenses = await _context.Expenses
                .Where(e => e.EntityId == entityId)
                .Include(e => e.ExpenseStatuses)
                .Include(e => e.ItemType)
                .ToListAsync();

            return expenses;
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            var expense = await _context.Expenses
                .Include(e => e.ExpenseStatuses)
                .Include(e => e.ItemType)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (expense == null)
            {
                return NotFound(new { message = $"Expense with ID {id} not found." });
            }

            return Ok(expense);
        }

        // POST: api/Expenses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Expense>> PostExpense(Expense expense)
        {
            expense.CreatedOn = DateTime.Now;
            expense.LastEditOn = DateTime.Now;
            // Detach any navigations sent from client to avoid EF tracking issues
            expense.ExpensePayments.Clear();
            expense.ExpenseStatuses.Clear();

            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
        }

        // PUT: api/Expenses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(int id, Expense expense)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }

            expense.LastEditOn = DateTime.Now;

            // Get the existing expense from database
            var existingExpense = await _context.Expenses.FindAsync(id);
            if (existingExpense == null)
            {
                return NotFound();
            }

            // Update only the properties we want to modify
            existingExpense.TrxDate = expense.TrxDate;
            existingExpense.Amount = expense.Amount;
            existingExpense.EntityId = expense.EntityId;
            existingExpense.ItemTypeId = expense.ItemTypeId;
            existingExpense.Remarks = expense.Remarks;
            existingExpense.IsActive = expense.IsActive;
            existingExpense.IsArchived = expense.IsArchived;
            existingExpense.IsPrivate = expense.IsPrivate;
            existingExpense.LastEditBy = expense.LastEditBy;
            existingExpense.LastEditOn = expense.LastEditOn;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
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

        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Expenses/5/Statuses
        [HttpGet("{id}/Statuses")]
        public async Task<ActionResult<IEnumerable<ExpenseStatus>>> GetExpenseStatuses(int id)
        {
            var statuses = await _context.ExpenseStatuses
                .Where(es => es.ExpenseId == id)
                .ToListAsync();

            return statuses;
        }

        // POST: api/Expenses/5/Statuses
        [HttpPost("{id}/Statuses")]
        public async Task<ActionResult<ExpenseStatus>> PostExpenseStatus(int id, ExpenseStatus status)
        {
            status.ExpenseId = id;
            status.StatusDate = DateTime.Now;

            _context.ExpenseStatuses.Add(status);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExpenseStatuses), new { id }, status);
        }

        // GET: api/Expenses/5/Jobs
        [HttpGet("{id}/Jobs")]
        public async Task<ActionResult<IEnumerable<JobExpense>>> GetJobExpenses(int id)
        {
            var jobExpenses = await _context.JobExpenses
                .Where(je => je.ExpensesId == id)
                .ToListAsync();

            return jobExpenses;
        }

        // POST: api/Expenses/5/Jobs
        [HttpPost("{id}/Jobs")]
        public async Task<ActionResult<JobExpense>> PostJobExpense(int id, JobExpense jobExpense)
        {
            jobExpense.ExpensesId = id;

            _context.JobExpenses.Add(jobExpense);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJobExpenses), new { id }, jobExpense);
        }

        // PUT: api/Expenses/Jobs/5
        [HttpPut("Jobs/{jobExpenseId}")]
        public async Task<IActionResult> PutJobExpense(int jobExpenseId, JobExpense jobExpense)
        {
            if (jobExpenseId != jobExpense.Id)
            {
                return BadRequest();
            }

            _context.Entry(jobExpense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.JobExpenses.Any(e => e.Id == jobExpenseId))
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

        // DELETE: api/Expenses/Jobs/5
        [HttpDelete("Jobs/{jobExpenseId}")]
        public async Task<IActionResult> DeleteJobExpense(int jobExpenseId)
        {
            var jobExpense = await _context.JobExpenses.FindAsync(jobExpenseId);
            if (jobExpense == null)
            {
                return NotFound();
            }

            _context.JobExpenses.Remove(jobExpense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExpenseExists(int id)
        {
            return _context.Expenses.Any(e => e.Id == id);
        }
    }
}
