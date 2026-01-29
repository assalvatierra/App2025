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
    public class ItemTypeClassController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ItemTypeClassController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ItemTypeClass
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemTypeClass>>> GetItemTypeClass()
        {
            return await _context.ItemTypeClass.ToListAsync();
        }

        // GET: api/ItemTypeClass/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemTypeClass>> GetItemTypeClass(int id)
        {
            var itemTypeClass = await _context.ItemTypeClass.FindAsync(id);

            if (itemTypeClass == null)
            {
                return NotFound();
            }

            return itemTypeClass;
        }

        // PUT: api/ItemTypeClass/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemTypeClass(int id, ItemTypeClass itemTypeClass)
        {
            if (id != itemTypeClass.Id)
            {
                return BadRequest();
            }

            _context.Entry(itemTypeClass).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemTypeClassExists(id))
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

        // POST: api/ItemTypeClass
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemTypeClass>> PostItemTypeClass(ItemTypeClass itemTypeClass)
        {
            _context.ItemTypeClass.Add(itemTypeClass);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemTypeClass", new { id = itemTypeClass.Id }, itemTypeClass);
        }

        // DELETE: api/ItemTypeClass/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemTypeClass(int id)
        {
            var itemTypeClass = await _context.ItemTypeClass.FindAsync(id);
            if (itemTypeClass == null)
            {
                return NotFound();
            }

            _context.ItemTypeClass.Remove(itemTypeClass);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemTypeClassExists(int id)
        {
            return _context.ItemTypeClass.Any(e => e.Id == id);
        }
    }
}
