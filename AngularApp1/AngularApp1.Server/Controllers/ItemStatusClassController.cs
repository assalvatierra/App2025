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
    public class ItemStatusClassController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ItemStatusClassController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ItemStatusClass
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemStatusClass>>> GetItemStatusClass()
        {
            return await _context.ItemStatusClass.ToListAsync();
        }

        // GET: api/ItemStatusClass/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemStatusClass>> GetItemStatusClass(int id)
        {
            var itemStatusClass = await _context.ItemStatusClass.FindAsync(id);

            if (itemStatusClass == null)
            {
                return NotFound();
            }

            return itemStatusClass;
        }

        // PUT: api/ItemStatusClass/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemStatusClass(int id, ItemStatusClass itemStatusClass)
        {
            if (id != itemStatusClass.Id)
            {
                return BadRequest();
            }

            _context.Entry(itemStatusClass).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemStatusClassExists(id))
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

        // POST: api/ItemStatusClass
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemStatusClass>> PostItemStatusClass(ItemStatusClass itemStatusClass)
        {
            _context.ItemStatusClass.Add(itemStatusClass);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemStatusClass", new { id = itemStatusClass.Id }, itemStatusClass);
        }

        // DELETE: api/ItemStatusClass/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemStatusClass(int id)
        {
            var itemStatusClass = await _context.ItemStatusClass.FindAsync(id);
            if (itemStatusClass == null)
            {
                return NotFound();
            }

            _context.ItemStatusClass.Remove(itemStatusClass);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemStatusClassExists(int id)
        {
            return _context.ItemStatusClass.Any(e => e.Id == id);
        }
    }
}
