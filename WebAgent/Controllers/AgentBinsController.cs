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
    public class AgentBinsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AgentBinsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: AgentBins
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.AgentBin.Include(a => a.Agent);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: AgentBins/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agentBin = await _context.AgentBin
                .Include(a => a.Agent)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (agentBin == null)
            {
                return NotFound();
            }

            return View(agentBin);
        }

        // GET: AgentBins/Create
        public IActionResult Create()
        {
            ViewData["AgentId"] = new SelectList(_context.Agent, "Id", "Name");
            return View();
        }

        // POST: AgentBins/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AgentId,Data,DtAdded")] AgentBin agentBin)
        {
            if (ModelState.IsValid)
            {
                _context.Add(agentBin);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["AgentId"] = new SelectList(_context.Agent, "Id", "Name", agentBin.AgentId);
            return View(agentBin);
        }

        // GET: AgentBins/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agentBin = await _context.AgentBin.FindAsync(id);
            if (agentBin == null)
            {
                return NotFound();
            }
            ViewData["AgentId"] = new SelectList(_context.Agent, "Id", "Name", agentBin.AgentId);
            return View(agentBin);
        }

        // POST: AgentBins/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AgentId,Data,DtAdded")] AgentBin agentBin)
        {
            if (id != agentBin.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(agentBin);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AgentBinExists(agentBin.Id))
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
            ViewData["AgentId"] = new SelectList(_context.Agent, "Id", "Name", agentBin.AgentId);
            return View(agentBin);
        }

        // GET: AgentBins/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agentBin = await _context.AgentBin
                .Include(a => a.Agent)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (agentBin == null)
            {
                return NotFound();
            }

            return View(agentBin);
        }

        // POST: AgentBins/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var agentBin = await _context.AgentBin.FindAsync(id);
            if (agentBin != null)
            {
                _context.AgentBin.Remove(agentBin);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AgentBinExists(int id)
        {
            return _context.AgentBin.Any(e => e.Id == id);
        }
    }
}
