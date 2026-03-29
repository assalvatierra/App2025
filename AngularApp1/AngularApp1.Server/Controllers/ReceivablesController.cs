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
    public class ReceivablesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ReceivablesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/Receivables
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Receivable>>> GetReceivables()
        {
            return await _context.Receivables
                .Include(r => r.JobReceivables)
                .Include(r => r.ReceivableCustomers)
                .Include(r => r.ReceivablePayments)
                .Include(r => r.ReceivableStatuses)
                .ToListAsync();
        }

        // GET: api/Receivables/byEntity/5
        [HttpGet("byEntity/{entityId}")]
        public async Task<ActionResult<IEnumerable<Receivable>>> GetReceivablesByEntity(int entityId)
        {
            var receivables = await _context.Receivables
                .Where(r => r.EntityId == entityId)
                .Include(r => r.JobReceivables)
                .Include(r => r.ReceivableCustomers)
                .Include(r => r.ReceivablePayments)
                .Include(r => r.ReceivableStatuses)
                .ToListAsync();

            return receivables;
        }

        // GET: api/Receivables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Receivable>> GetReceivable(int id)
        {
            var receivable = await _context.Receivables
                .Include(r => r.JobReceivables)
                .Include(r => r.ReceivableCustomers)
                .Include(r => r.ReceivablePayments)
                .Include(r => r.ReceivableStatuses)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (receivable == null)
            {
                return NotFound();
            }

            return receivable;
        }

        // PUT: api/Receivables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceivable(int id, Receivable receivable)
        {
            if (id != receivable.Id)
            {
                return BadRequest();
            }

            // Update LastEditOn and LastEditBy
            receivable.LastEditOn = DateTime.Now;
            // Note: LastEditBy should be set from the authenticated user context

            _context.Entry(receivable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceivableExists(id))
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

        // POST: api/Receivables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Receivable>> PostReceivable(Receivable receivable)
        {
            // Set creation fields
            receivable.CreatedOn = DateTime.Now;
            receivable.LastEditOn = DateTime.Now;
            
            // Set CreatedBy and LastEditBy if not provided
            if (string.IsNullOrEmpty(receivable.CreatedBy))
            {
                receivable.CreatedBy = User?.Identity?.Name ?? "System";
            }
            if (string.IsNullOrEmpty(receivable.LastEditBy))
            {
                receivable.LastEditBy = User?.Identity?.Name ?? "System";
            }

            _context.Receivables.Add(receivable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceivable", new { id = receivable.Id }, receivable);
        }

        // DELETE: api/Receivables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceivable(int id)
        {
            var receivable = await _context.Receivables.FindAsync(id);
            if (receivable == null)
            {
                return NotFound();
            }

            _context.Receivables.Remove(receivable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Receivables/5/archive
        [HttpPatch("{id}/archive")]
        public async Task<IActionResult> ArchiveReceivable(int id)
        {
            var receivable = await _context.Receivables.FindAsync(id);
            if (receivable == null)
            {
                return NotFound();
            }

            receivable.IsArchived = true;
            receivable.IsActive = false;
            receivable.LastEditOn = DateTime.Now;
            // Note: LastEditBy should be set from the authenticated user context

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Receivables/5/activate
        [HttpPatch("{id}/activate")]
        public async Task<IActionResult> ActivateReceivable(int id)
        {
            var receivable = await _context.Receivables.FindAsync(id);
            if (receivable == null)
            {
                return NotFound();
            }

            receivable.IsActive = true;
            receivable.LastEditOn = DateTime.Now;
            // Note: LastEditBy should be set from the authenticated user context

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReceivableExists(int id)
        {
            return _context.Receivables.Any(e => e.Id == id);
        }
    }
}
