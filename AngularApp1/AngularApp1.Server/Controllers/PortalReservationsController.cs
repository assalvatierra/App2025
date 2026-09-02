using AngularApp1.Server.DBServices;
using AngularApp1.Server.DTOs;
using Erp.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularApp1.Server.Controllers
{
  //  [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PortalReservationsController : ControllerBase
    {
        private readonly IPortalReservationsService _service;

        public PortalReservationsController(IPortalReservationsService service)
        {
            _service = service;
        }

        // GET: api/PortalReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PortalReservation>>> GetPortalReservation()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/PortalReservations/List
        [HttpGet("List")]
        public async Task<ActionResult<IEnumerable<PortalReservationDto>>> GetPortalReservationList()
        {
            return await _service.GetListAsync();
        }

        // GET: api/PortalReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PortalReservationDto>> GetPortalReservation(int id)
        {
            var portalReservation = await _service.GetByIdDtoAsync(id);

            if (portalReservation == null)
            {
                return NotFound();
            }

            return portalReservation;
        }

        // PUT: api/PortalReservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
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

        // POST: api/PortalReservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PortalReservation>> PostPortalReservation(PortalReservation portalReservation)
        {
            await _service.AddAsync(portalReservation);
            return CreatedAtAction("GetPortalReservation", new { id = portalReservation.Id }, portalReservation);
        }

        // DELETE: api/PortalReservations/5
        [HttpDelete("{id}")]
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
