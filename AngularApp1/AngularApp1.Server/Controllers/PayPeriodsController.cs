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
    public class PayPeriodsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public PayPeriodsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/PayPeriods
        // GET: api/PayPeriods?isActive=true
        // GET: api/PayPeriods?dateFrom=2024-01-01&dateTo=2024-12-31
        // GET: api/PayPeriods?itemTypeId=1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayPeriod>>> GetPayPeriods(
            [FromQuery] bool? isActive = null,
            [FromQuery] DateTime? dateFrom = null,
            [FromQuery] DateTime? dateTo = null,
            [FromQuery] int? itemStatusId = null,
            [FromQuery] int? itemTypeId = null)
        {
            var query = _context.PayPeriods
                .Include(pp => pp.ItemType)
                .AsQueryable();

            if (isActive.HasValue)
            {
                query = query.Where(pp => pp.IsActive == isActive.Value);
            }

            if (dateFrom.HasValue)
            {
                query = query.Where(pp => pp.DateTo >= dateFrom.Value);
            }

            if (dateTo.HasValue)
            {
                query = query.Where(pp => pp.DateFrom <= dateTo.Value);
            }

            if (itemStatusId.HasValue)
            {
                query = query.Where(pp => pp.ItemStatusId == itemStatusId.Value);
            }

            if (itemTypeId.HasValue)
            {
                query = query.Where(pp => pp.ItemTypeId == itemTypeId.Value);
            }

            var payPeriods = await query
                .OrderByDescending(pp => pp.DateFrom)
                .ToListAsync();

            return Ok(payPeriods);
        }

        // GET: api/PayPeriods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayPeriod>> GetPayPeriod(int id)
        {
            var payPeriod = await _context.PayPeriods.FindAsync(id);

            if (payPeriod == null)
            {
                return NotFound();
            }

            return payPeriod;
        }

        // GET: api/PayPeriods/Current
        [HttpGet("Current")]
        public async Task<ActionResult<PayPeriod>> GetCurrentPayPeriod()
        {
            var currentDate = DateTime.UtcNow.Date;

            var payPeriod = await _context.PayPeriods
                .Where(pp => pp.IsActive == true &&
                            pp.DateFrom <= currentDate &&
                            pp.DateTo >= currentDate)
                .OrderByDescending(pp => pp.CreatedOn)
                .FirstOrDefaultAsync();

            if (payPeriod == null)
            {
                return NotFound();
            }

            return payPeriod;
        }

        // GET: api/PayPeriods/ByDate/{date}
        [HttpGet("ByDate/{date}")]
        public async Task<ActionResult<PayPeriod>> GetPayPeriodByDate(DateTime date)
        {
            var payPeriod = await _context.PayPeriods
                .Where(pp => pp.DateFrom <= date && pp.DateTo >= date)
                .OrderByDescending(pp => pp.CreatedOn)
                .FirstOrDefaultAsync();

            if (payPeriod == null)
            {
                return NotFound();
            }

            return payPeriod;
        }

        // PUT: api/PayPeriods/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayPeriod(int id, PayPeriod payPeriod)
        {
            if (id != payPeriod.Id)
            {
                return BadRequest();
            }

            var existingPayPeriod = await _context.PayPeriods.FindAsync(id);
            if (existingPayPeriod == null)
            {
                return NotFound();
            }

            // Update properties
            existingPayPeriod.DateFrom = payPeriod.DateFrom;
            existingPayPeriod.DateTo = payPeriod.DateTo;
            existingPayPeriod.PayDate = payPeriod.PayDate;
            existingPayPeriod.Notes = payPeriod.Notes;
            existingPayPeriod.ItemStatusId = payPeriod.ItemStatusId;
            existingPayPeriod.ItemTypeId = payPeriod.ItemTypeId;
            existingPayPeriod.IsActive = payPeriod.IsActive;
            existingPayPeriod.IsPrivate = payPeriod.IsPrivate;
            existingPayPeriod.IsArchived = payPeriod.IsArchived;
            existingPayPeriod.LastEditBy = payPeriod.LastEditBy;
            existingPayPeriod.LastEditOn = payPeriod.LastEditOn;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayPeriodExists(id))
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

        // POST: api/PayPeriods
        [HttpPost]
        public async Task<ActionResult<PayPeriod>> PostPayPeriod(PayPeriod payPeriod)
        {
            // Set audit fields
            payPeriod.CreatedOn = DateTime.UtcNow;
            payPeriod.LastEditOn = DateTime.UtcNow;

            _context.PayPeriods.Add(payPeriod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayPeriod", new { id = payPeriod.Id }, payPeriod);
        }

        // DELETE: api/PayPeriods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayPeriod(int id)
        {
            var payPeriod = await _context.PayPeriods.FindAsync(id);
            if (payPeriod == null)
            {
                return NotFound();
            }

            _context.PayPeriods.Remove(payPeriod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/PayPeriods/5/Expenses
        [HttpGet("{id}/Expenses")]
        public async Task<ActionResult<IEnumerable<object>>> GetPayPeriodExpenses(int id)
        {
            var payPeriod = await _context.PayPeriods.FindAsync(id);
            if (payPeriod == null)
            {
                return NotFound();
            }

            var expenses = await _context.PayExpenses
                .Where(pe => pe.PayPeriodId == id)
                .Join(_context.Expenses,
                    pe => pe.ExpenseId,
                    e => e.Id,
                    (pe, e) => new
                    {
                        Id = pe.Id,
                        ExpenseId = e.Id,
                        TrxDate = e.TrxDate,
                        Amount = e.Amount,
                        Remarks = e.Remarks,
                        TrxRef = e.TrxRef,
                        ItemTypeId = e.ItemTypeId,
                        IsActive = e.IsActive,
                        IsArchived = e.IsArchived
                    })
                .ToListAsync();

            return Ok(expenses);
        }

        // GET: api/PayPeriods/5/Timesheets
        [HttpGet("{id}/Timesheets")]
        public async Task<ActionResult<IEnumerable<object>>> GetPayPeriodTimesheets(int id)
        {
            var payPeriod = await _context.PayPeriods.FindAsync(id);
            if (payPeriod == null)
            {
                return NotFound();
            }

            var timesheets = await _context.Timesheet
                .Include(t => t.Resource)
                .Include(t => t.ResourceId1Navigation)
                .Include(t => t.PayPeriod)
                .Include(t => t.TimesheetExpenseDetail)
                .Where(t => t.PayPeriodId == id)
                .OrderByDescending(t => t.TsDate)
                .Select(t => new
                {
                    Id = t.Id,
                    TsDate = t.TsDate,
                    Remarks = t.Remarks,
                    ResourceId = t.ResourceId,
                    ResourceName = t.Resource != null ? t.Resource.Name : null,
                    ResourceCode = t.Resource != null ? t.Resource.Code : null,
                    ResourceId1 = t.ResourceId1,
                    ResourceId1Name = t.ResourceId1Navigation != null ? t.ResourceId1Navigation.Name : null,
                    ResourceId1Code = t.ResourceId1Navigation != null ? t.ResourceId1Navigation.Code : null,
                    ItemStatusId = t.ItemStatusId,
                    PayPeriodId = t.PayPeriodId,
                    TimesheetExpenseDetail = t.TimesheetExpenseDetail != null ? new
                    {
                        Id = t.TimesheetExpenseDetail.Id,
                        BillAmount = t.TimesheetExpenseDetail.BillAmount,
                        AdditionalBillAmount = t.TimesheetExpenseDetail.AdditionalBillAmount,
                        ResourceRate = t.TimesheetExpenseDetail.ResourceRate,
                        AdditionalRate = t.TimesheetExpenseDetail.AdditionalRate,
                        ResourceRate1 = t.TimesheetExpenseDetail.ResourceRate1,
                        AdditionalRate1 = t.TimesheetExpenseDetail.AdditionalRate1,
                        RegularExpense = t.TimesheetExpenseDetail.RegularExpense,
                        OtherExpense = t.TimesheetExpenseDetail.OtherExpense,
                        Discount = t.TimesheetExpenseDetail.Discount,
                        AmountRemarks = t.TimesheetExpenseDetail.AmountRemarks
                    } : null
                })
                .ToListAsync();

            return Ok(timesheets);
        }

        // GET: api/PayPeriods/5/Additions
        [HttpGet("{id}/Additions")]
        public async Task<ActionResult<IEnumerable<PayAddition>>> GetPayPeriodAdditions(int id)
        {
            var payPeriod = await _context.PayPeriods.FindAsync(id);
            if (payPeriod == null)
            {
                return NotFound();
            }

            var additions = await _context.PayAdditions
                .Where(pa => pa.PayPeriodId == id)
                .OrderByDescending(pa => pa.Id)
                .ToListAsync();

            return Ok(additions);
        }

        // GET: api/PayPeriods/Additions/5
        [HttpGet("Additions/{id}")]
        public async Task<ActionResult<PayAddition>> GetPayAddition(int id)
        {
            var payAddition = await _context.PayAdditions.FindAsync(id);

            if (payAddition == null)
            {
                return NotFound();
            }

            return payAddition;
        }

        // POST: api/PayPeriods/Additions
        [HttpPost("Additions")]
        public async Task<ActionResult<PayAddition>> PostPayAddition(PayAddition payAddition)
        {
            try
            {
                // Log the incoming data
                Console.WriteLine($"Received PayAddition: PayPeriodId={payAddition.PayPeriodId}, ResourceId={payAddition.ResourceId}, Amount={payAddition.Amount}, IsAdd={payAddition.IsAdd}");

                // Validate PayPeriodId exists
                if (payAddition.PayPeriodId.HasValue)
                {
                    var payPeriodExists = await _context.PayPeriods.AnyAsync(pp => pp.Id == payAddition.PayPeriodId.Value);
                    if (!payPeriodExists)
                    {
                        return BadRequest(new { message = $"Pay Period with ID {payAddition.PayPeriodId} does not exist." });
                    }
                }

                // Validate ResourceId exists if provided
                if (payAddition.ResourceId.HasValue)
                {
                    var resourceExists = await _context.Resource.AnyAsync(r => r.Id == payAddition.ResourceId.Value);
                    if (!resourceExists)
                    {
                        return BadRequest(new { message = $"Resource with ID {payAddition.ResourceId} does not exist." });
                    }
                }

                _context.PayAdditions.Add(payAddition);
                await _context.SaveChangesAsync();

                Console.WriteLine($"Successfully created PayAddition with ID {payAddition.Id}");
                return CreatedAtAction("GetPayAddition", new { id = payAddition.Id }, payAddition);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating PayAddition: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, new { message = "An error occurred while creating the pay addition.", details = ex.Message, innerException = ex.InnerException?.Message });
            }
        }

        // PUT: api/PayPeriods/Additions/5
        [HttpPut("Additions/{id}")]
        public async Task<IActionResult> PutPayAddition(int id, PayAddition payAddition)
        {
            if (id != payAddition.Id)
            {
                return BadRequest();
            }

            var existingPayAddition = await _context.PayAdditions.FindAsync(id);
            if (existingPayAddition == null)
            {
                return NotFound();
            }

            // Update properties
            existingPayAddition.PayPeriodId = payAddition.PayPeriodId;
            existingPayAddition.ResourceId = payAddition.ResourceId;
            existingPayAddition.Amount = payAddition.Amount;
            existingPayAddition.Remarks = payAddition.Remarks;
            existingPayAddition.IsAdd = payAddition.IsAdd;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayAdditionExists(id))
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

        // DELETE: api/PayPeriods/Additions/5
        [HttpDelete("Additions/{id}")]
        public async Task<IActionResult> DeletePayAddition(int id)
        {
            var payAddition = await _context.PayAdditions.FindAsync(id);
            if (payAddition == null)
            {
                return NotFound();
            }

            _context.PayAdditions.Remove(payAddition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PayPeriodExists(int id)
        {
            return _context.PayPeriods.Any(e => e.Id == id);
        }

        private bool PayAdditionExists(int id)
        {
            return _context.PayAdditions.Any(e => e.Id == id);
        }
    }
}
