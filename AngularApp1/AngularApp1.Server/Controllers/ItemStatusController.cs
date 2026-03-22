using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemStatusController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ItemStatusController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ItemStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemStatus>>> GetItemStatus()
        {
            return await _context.ItemStatus.ToListAsync();
        }

        // GET: api/ItemStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemStatus>> GetItemStatus(int id)
        {
            var itemStatus = await _context.ItemStatus.FindAsync(id);

            if (itemStatus == null)
            {
                return NotFound();
            }

            return itemStatus;
        }

        // GET: api/ItemStatus/ByClassName/{className}
        [HttpGet("ByClassName/{className}")]
        public async Task<ActionResult<IEnumerable<ItemStatus>>> GetItemStatusByClassName(string className)
        {
            var itemStatuses = await _context.ItemStatus
                .Include(it => it.ItemStatusClass)
                .Where(it => it.ItemStatusClass != null &&
                             (it.ItemStatusClass.Name.ToUpper() == className.ToUpper() ||
                              it.ItemStatusClass.Code != null && it.ItemStatusClass.Code.ToUpper() == className.ToUpper()))
                .ToListAsync();

            return itemStatuses;
        }

        // GET: api/ItemStatus/ByCode/{code}
        [HttpGet("ByCode/{code}")]
        public async Task<ActionResult<ItemStatus>> GetItemStatusByCode(string code)
        {
            var itemStatus = await _context.ItemStatus
                .FirstOrDefaultAsync(it => it.Code == code);

            if (itemStatus == null)
            {
                return NotFound();
            }

            return itemStatus;
        }

        // PUT: api/ItemStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemStatus(int id, ItemStatus itemStatus)
        {
            if (id != itemStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(itemStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemStatusExists(id))
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

        // POST: api/ItemStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemStatus>> PostItemStatus(ItemStatus itemStatus)
        {
            _context.ItemStatus.Add(itemStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemStatus", new { id = itemStatus.Id }, itemStatus);
        }

        // DELETE: api/ItemStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemStatus(int id)
        {
            var itemStatus = await _context.ItemStatus.FindAsync(id);
            if (itemStatus == null)
            {
                return NotFound();
            }

            _context.ItemStatus.Remove(itemStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemStatusExists(int id)
        {
            return _context.ItemStatus.Any(e => e.Id == id);
        }
    }
}
