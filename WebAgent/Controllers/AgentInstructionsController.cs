using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;
using WebAgent.Data;

namespace WebAgent.Controllers
{
    public class AgentInstructionsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AgentInstructionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: AgentInstructions
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.AgentInstruction.Include(a => a.Agent);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: AgentInstructions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agentInstruction = await _context.AgentInstruction
                .Include(a => a.Agent)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (agentInstruction == null)
            {
                return NotFound();
            }

            return View(agentInstruction);
        }

        // GET: AgentInstructions/Create
        public IActionResult Create()
        {
            ViewData["AgentId"] = new SelectList(_context.Agent, "Id", "Name");
            return View();
        }

        // POST: AgentInstructions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AgentId,Title,Content,Keywords")] AgentInstruction agentInstruction)
        {
            if (ModelState.IsValid)
            {
                _context.Add(agentInstruction);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AgentId"] = new SelectList(_context.Agent, "Id", "Name", agentInstruction.AgentId);
            return View(agentInstruction);
        }

        // GET: AgentInstructions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agentInstruction = await _context.AgentInstruction.FindAsync(id);
            if (agentInstruction == null)
            {
                return NotFound();
            }
            ViewData["AgentId"] = new SelectList(_context.Agent, "Id", "Name", agentInstruction.AgentId);
            return View(agentInstruction);
        }

        // POST: AgentInstructions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AgentId,Title,Content,Keywords")] AgentInstruction agentInstruction)
        {
            if (id != agentInstruction.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(agentInstruction);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AgentInstructionExists(agentInstruction.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["AgentId"] = new SelectList(_context.Agent, "Id", "Name", agentInstruction.AgentId);
            return View(agentInstruction);
        }

        // GET: AgentInstructions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agentInstruction = await _context.AgentInstruction
                .Include(a => a.Agent)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (agentInstruction == null)
            {
                return NotFound();
            }

            return View(agentInstruction);
        }

        // POST: AgentInstructions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var agentInstruction = await _context.AgentInstruction.FindAsync(id);
            if (agentInstruction != null)
            {
                _context.AgentInstruction.Remove(agentInstruction);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AgentInstructionExists(int id)
        {
            return _context.AgentInstruction.Any(e => e.Id == id);
        }
    }
}
