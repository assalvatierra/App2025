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
    public class ReceivableStatusesController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public ReceivableStatusesController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/ReceivableStatuses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceivableStatus>>> GetReceivableStatuses()
        {
            return await _context.ReceivableStatuses.ToListAsync();
        }

        // GET: api/ReceivableStatuses/byReceivable/5
        [HttpGet("byReceivable/{receivableId}")]
        public async Task<ActionResult<IEnumerable<ReceivableStatus>>> GetReceivableStatusesByReceivable(int receivableId)
        {
            var statuses = await _context.ReceivableStatuses
                .Where(rs => rs.ReceivableId == receivableId)
                .ToListAsync();

            return statuses;
        }

        // GET: api/ReceivableStatuses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceivableStatus>> GetReceivableStatus(int id)
        {
            var receivableStatus = await _context.ReceivableStatuses.FindAsync(id);

            if (receivableStatus == null)
            {
                return NotFound();
            }

            return receivableStatus;
        }

        // PUT: api/ReceivableStatuses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceivableStatus(int id, ReceivableStatus receivableStatus)
        {
            if (id != receivableStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(receivableStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceivableStatusExists(id))
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

        // POST: api/ReceivableStatuses
        [HttpPost]
        public async Task<ActionResult<ReceivableStatus>> PostReceivableStatus(ReceivableStatus receivableStatus)
        {
            _context.ReceivableStatuses.Add(receivableStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceivableStatus", new { id = receivableStatus.Id }, receivableStatus);
        }

        // DELETE: api/ReceivableStatuses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceivableStatus(int id)
        {
            var receivableStatus = await _context.ReceivableStatuses.FindAsync(id);
            if (receivableStatus == null)
            {
                return NotFound();
            }

            _context.ReceivableStatuses.Remove(receivableStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReceivableStatusExists(int id)
        {
            return _context.ReceivableStatuses.Any(e => e.Id == id);
        }
    }
}
