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
    public class AgentInstructionsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public AgentInstructionsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/AgentInstructions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgentInstruction>>> GetAgentInstruction()
        {
            return await _context.AgentInstruction.ToListAsync();
        }

        // GET: api/AgentInstructions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AgentInstruction>> GetAgentInstruction(int id)
        {
            var agentInstruction = await _context.AgentInstruction.FindAsync(id);

            if (agentInstruction == null)
            {
                return NotFound();
            }

            return agentInstruction;
        }

        // PUT: api/AgentInstructions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgentInstruction(int id, AgentInstruction agentInstruction)
        {
            if (id != agentInstruction.Id)
            {
                return BadRequest();
            }

            _context.Entry(agentInstruction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgentInstructionExists(id))
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

        // POST: api/AgentInstructions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AgentInstruction>> PostAgentInstruction(AgentInstruction agentInstruction)
        {
            _context.AgentInstruction.Add(agentInstruction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgentInstruction", new { id = agentInstruction.Id }, agentInstruction);
        }

        // DELETE: api/AgentInstructions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgentInstruction(int id)
        {
            var agentInstruction = await _context.AgentInstruction.FindAsync(id);
            if (agentInstruction == null)
            {
                return NotFound();
            }

            _context.AgentInstruction.Remove(agentInstruction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AgentInstructionExists(int id)
        {
            return _context.AgentInstruction.Any(e => e.Id == id);
        }
    }
}
