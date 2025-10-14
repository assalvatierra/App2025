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
    public class AgentBinsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public AgentBinsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/AgentBins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgentBin>>> GetAgentBin()
        {
            return await _context.AgentBin.ToListAsync();
        }

        // GET: api/AgentBins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AgentBin>> GetAgentBin(int id)
        {
            var agentBin = await _context.AgentBin.FindAsync(id);

            if (agentBin == null)
            {
                return NotFound();
            }

            return agentBin;
        }

        // PUT: api/AgentBins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgentBin(int id, AgentBin agentBin)
        {
            if (id != agentBin.Id)
            {
                return BadRequest();
            }

            _context.Entry(agentBin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgentBinExists(id))
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

        // POST: api/AgentBins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AgentBin>> PostAgentBin(AgentBin agentBin)
        {
            _context.AgentBin.Add(agentBin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgentBin", new { id = agentBin.Id }, agentBin);
        }

        // DELETE: api/AgentBins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgentBin(int id)
        {
            var agentBin = await _context.AgentBin.FindAsync(id);
            if (agentBin == null)
            {
                return NotFound();
            }

            _context.AgentBin.Remove(agentBin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AgentBinExists(int id)
        {
            return _context.AgentBin.Any(e => e.Id == id);
        }
    }
}
