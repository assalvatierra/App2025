using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChecklistController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ChecklistController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/Checklist/items
        [HttpGet("items")]
        public async Task<ActionResult<IEnumerable<ChecklistItem>>> GetChecklistItems([FromQuery] string? itemTypeCode = null)
        {
            var query = _context.ChecklistItem.AsQueryable();

            if (!string.IsNullOrWhiteSpace(itemTypeCode))
            {
                var matchingTypeIds = _context.ItemType
                    .Where(t => t.Code == itemTypeCode)
                    .Select(t => t.Id);
                query = query.Where(i => i.ItemTypeId != null && matchingTypeIds.Contains(i.ItemTypeId.Value));
            }

            var items = await query
                .OrderBy(i => i.SortOrder)
                .Select(i => new ChecklistItem
                {
                    Id = i.Id,
                    Name = i.Name,
                    Description = i.Description,
                    Remarks = i.Remarks,
                    Code = i.Code,
                    SortOrder = i.SortOrder,
                    ItemTypeId = i.ItemTypeId,
                    ItemStatusId = i.ItemStatusId
                })
                .ToListAsync();

            return Ok(items);
        }

        // GET: api/Checklist/items/5
        [HttpGet("items/{id}")]
        public async Task<ActionResult<ChecklistItem>> GetChecklistItem(int id)
        {
            var item = await _context.ChecklistItem.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST: api/Checklist/items
        [HttpPost("items")]
        public async Task<ActionResult<ChecklistItem>> PostChecklistItem(ChecklistItem item)
        {
            _context.ChecklistItem.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChecklistItem), new { id = item.Id }, item);
        }

        // PUT: api/Checklist/items/5
        [HttpPut("items/{id}")]
        public async Task<IActionResult> PutChecklistItem(int id, ChecklistItem item)
        {
            if (id != item.Id)
                return BadRequest();

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.ChecklistItem.Any(e => e.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Checklist/items/5
        [HttpDelete("items/{id}")]
        public async Task<IActionResult> DeleteChecklistItem(int id)
        {
            var item = await _context.ChecklistItem.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.ChecklistItem.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Checklist/transactions?refObject=JobMain&refId=123
        [HttpGet("transactions")]
        public async Task<ActionResult<IEnumerable<object>>> GetChecklistTransactions([FromQuery] string? refObject = null, [FromQuery] int? refId = null)
        {
            var query = _context.ChecklistTransaction.AsQueryable();

            if (!string.IsNullOrWhiteSpace(refObject))
            {
                query = query.Where(t => t.RefObject == refObject);
            }

            if (refId.HasValue)
            {
                query = query.Where(t => t.RefId == refId.Value);
            }

            var transactions = await query
                .Include(t => t.ChecklistItem)
                .OrderBy(t => t.ChecklistItem != null ? t.ChecklistItem.SortOrder : int.MaxValue)
                .ThenByDescending(t => t.CreatedOn)
                .Select(t => new
                {
                    t.Id,
                    t.CreatedBy,
                    t.CreatedOn,
                    t.LastEditBy,
                    t.LastEditOn,
                    t.IsArchived,
                    t.IsPrivate,
                    t.IsActive,
                    t.Notes,
                    t.IsDone,
                    t.ChecklistItemId,
                    t.RefId,
                    t.RefObject,
                    ChecklistItemName = t.ChecklistItem != null ? t.ChecklistItem.Name : null,
                    SortOrder = t.ChecklistItem != null ? t.ChecklistItem.SortOrder : null
                })
                .ToListAsync();

            return Ok(transactions);
        }

        // GET: api/Checklist/transactions/5
        [HttpGet("transactions/{id}")]
        public async Task<ActionResult<ChecklistTransaction>> GetChecklistTransaction(int id)
        {
            var trx = await _context.ChecklistTransaction.FindAsync(id);
            if (trx == null)
                return NotFound();
            return Ok(trx);
        }

        // POST: api/Checklist/transactions
        [HttpPost("transactions")]
        public async Task<ActionResult<ChecklistTransaction>> PostChecklistTransaction(ChecklistTransaction trx)
        {
            trx.CreatedOn = trx.CreatedOn == default ? DateTime.UtcNow : trx.CreatedOn;
            trx.LastEditOn = DateTime.UtcNow;

            _context.ChecklistTransaction.Add(trx);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChecklistTransaction), new { id = trx.Id }, trx);
        }

        // PUT: api/Checklist/transactions/5
        [HttpPut("transactions/{id}")]
        public async Task<IActionResult> PutChecklistTransaction(int id, ChecklistTransaction trx)
        {
            if (id != trx.Id)
                return BadRequest();

            trx.LastEditOn = DateTime.UtcNow;
            _context.Entry(trx).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.ChecklistTransaction.Any(e => e.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Checklist/transactions/5
        [HttpDelete("transactions/{id}")]
        public async Task<IActionResult> DeleteChecklistTransaction(int id)
        {
            var trx = await _context.ChecklistTransaction.FindAsync(id);
            if (trx == null)
                return NotFound();

            _context.ChecklistTransaction.Remove(trx);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
