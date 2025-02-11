using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Context;
using Entities;

namespace App2025.Server.Controllers
{
    public class CustMainsController : Controller
    {
        private readonly Models _context;

        public CustMainsController(Models context)
        {
            _context = context;
        }

        // GET: CustMains
        public async Task<IActionResult> Index()
        {
            var models = _context.CustMains.Include(c => c.CustStatus);
            return View(await models.ToListAsync());
        }

        // GET: CustMains/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var custMain = await _context.CustMains
                .Include(c => c.CustStatus)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (custMain == null)
            {
                return NotFound();
            }

            return View(custMain);
        }

        // GET: CustMains/Create
        public IActionResult Create()
        {
            ViewData["CustStatusId"] = new SelectList(_context.CustStatuses, "Id", "Id");
            return View();
        }

        // POST: CustMains/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,CustStatusId")] CustMain custMain)
        {
            if (ModelState.IsValid)
            {
                _context.Add(custMain);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustStatusId"] = new SelectList(_context.CustStatuses, "Id", "Id", custMain.CustStatusId);
            return View(custMain);
        }

        // GET: CustMains/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var custMain = await _context.CustMains.FindAsync(id);
            if (custMain == null)
            {
                return NotFound();
            }
            ViewData["CustStatusId"] = new SelectList(_context.CustStatuses, "Id", "Id", custMain.CustStatusId);
            return View(custMain);
        }

        // POST: CustMains/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CustStatusId")] CustMain custMain)
        {
            if (id != custMain.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(custMain);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CustMainExists(custMain.Id))
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
            ViewData["CustStatusId"] = new SelectList(_context.CustStatuses, "Id", "Id", custMain.CustStatusId);
            return View(custMain);
        }

        // GET: CustMains/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var custMain = await _context.CustMains
                .Include(c => c.CustStatus)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (custMain == null)
            {
                return NotFound();
            }

            return View(custMain);
        }

        // POST: CustMains/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var custMain = await _context.CustMains.FindAsync(id);
            if (custMain != null)
            {
                _context.CustMains.Remove(custMain);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CustMainExists(int id)
        {
            return _context.CustMains.Any(e => e.Id == id);
        }
    }
}
