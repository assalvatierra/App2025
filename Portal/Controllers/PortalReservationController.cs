using Erp.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portal.DBServices;
using Portal.Models;
using Portal.ViewModels;

namespace Portal.Controllers
{
    //[Authorize]
    public class PortalReservationController : Controller
    {
        private readonly IPortalReservationService _service;
        private readonly IPortalItemService _portalItemService;

        public PortalReservationController(IPortalReservationService service, IPortalItemService portalItemService)
        {
            _service = service;
            _portalItemService = portalItemService;
        }

        // GET: PortalReservation/ReservationForm
        [HttpGet]
        public async Task<IActionResult> ReservationForm(int? itemId)
        {
            var reservation = new PortalReservation
            {
                PortalItemId = itemId,
                DateReceived = DateTime.Now,
                Status = "Pending",
                TransactionType = "Reservation",
                JsonData = "{}"
            };

            var viewModel = new ReservationFormViewModel
            {
                Reservation = reservation
            };

            // Fetch the portal item if itemId is provided
            if (itemId.HasValue)
            {
                var portalItem = await _portalItemService.GetByIdAsync(itemId.Value);
                if (portalItem != null)
                {
                    viewModel.Item = portalItem.MapToDto();
                }
            }

            return View(viewModel);
        }

        // POST: PortalReservation/ReservationForm
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ReservationForm(ReservationFormViewModel viewModel)
        {
            var reservation = viewModel.Reservation;
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
                return RedirectToAction("Success", new { id = reservation.Id });
            }

            // Reload the item on validation failure
            if (reservation.PortalItemId.HasValue)
            {
                var portalItem = await _portalItemService.GetByIdAsync(reservation.PortalItemId.Value);
                if (portalItem != null)
                {
                    viewModel.Item = portalItem.MapToDto();
                }
            }

            return View(viewModel);
        }

        [HttpGet]
        public async Task<IActionResult> Success(int id)
        {
            var reservations = await _service.GetByIdAsync(id);
            if (reservations == null)
            {
                return NotFound();
            }

            ViewBag.Message = "Reservation submitted successfully!";
            return View(reservations);
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
