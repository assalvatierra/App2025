using Erp.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portal.DBServices;

namespace Portal.Controllers
{
    //[Authorize]
    public class PortalReservationController : Controller
    {
        private readonly IPortalReservationService _service;

        public PortalReservationController(IPortalReservationService service)
        {
            _service = service;
        }

        // GET: PortalReservation/ReservationForm
        [HttpGet]
        public IActionResult ReservationForm(int? itemId)
        {
            var reservation = new PortalReservation
            {
                PortalItemId = itemId,
                DateReceived = DateTime.Now,
                Status = "Pending",
                TransactionType = "Reservation",
                JsonData = "{}"
            };
            return View(reservation);
        }

        // POST: PortalReservation/ReservationForm
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ReservationForm(PortalReservation reservation)
        {
            reservation.DateReceived = DateTime.Now;
            reservation.Status = "Pending";

            if (ModelState.IsValid)
            {
                if (string.IsNullOrEmpty(reservation.JsonData))
                {
                    reservation.JsonData = "{}";
                }

                await _service.AddAsync(reservation);
                TempData["SuccessMessage"] = "Reservation submitted successfully!";
                return RedirectToAction("Index", "Home");
            }
            return View(reservation);
        }

        // API ENDPOINTS
        // GET: api/PortalReservation
        [HttpGet]
        [Route("api/[controller]")]
        public async Task<ActionResult<IEnumerable<PortalReservation>>> GetPortalReservations()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/PortalReservation/5
        [HttpGet("{id}")]
        [Route("api/[controller]/{id}")]
        public async Task<ActionResult<PortalReservation>> GetPortalReservation(int id)
        {
            var portalReservation = await _service.GetByIdAsync(id);

            if (portalReservation == null)
            {
                return NotFound();
            }

            return portalReservation;
        }

        // PUT: api/PortalReservation/5
        [HttpPut("{id}")]
        [Route("api/[controller]/{id}")]
        public async Task<IActionResult> PutPortalReservation(int id, PortalReservation portalReservation)
        {
            if (id != portalReservation.Id)
            {
                return BadRequest();
            }

            try
            {
                await _service.UpdateAsync(portalReservation);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_service.Exists(id))
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

        // POST: api/PortalReservation
        [HttpPost]
        [Route("api/[controller]")]
        public async Task<ActionResult<PortalReservation>> PostPortalReservation(PortalReservation portalReservation)
        {
            await _service.AddAsync(portalReservation);

            return CreatedAtAction(nameof(GetPortalReservation), new { id = portalReservation.Id }, portalReservation);
        }

        // DELETE: api/PortalReservation/5
        [HttpDelete("{id}")]
        [Route("api/[controller]/{id}")]
        public async Task<IActionResult> DeletePortalReservation(int id)
        {
            var portalReservation = await _service.GetByIdAsync(id);
            if (portalReservation == null)
            {
                return NotFound();
            }

            await _service.DeleteAsync(portalReservation);

            return NoContent();
        }
    }
}
