using AngularApp1.Server.Services.PaymentGateway;
using Erp.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentExternalController : ControllerBase
    {
        private readonly IPaymentExternalService _service;

        public PaymentExternalController(IPaymentExternalService service)
        {
            _service = service;
        }

        // GET: api/PaymentExternal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentExternal>>> GetPaymentExternals()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/PaymentExternal/byJobMain/5
        [HttpGet("byJobMain/{jobMainId}")]
        public async Task<ActionResult<IEnumerable<PaymentExternal>>> GetPaymentExternalByJobMainId(int jobMainId)
        {
            return await _service.GetByJobMainIdAsync(jobMainId);
        }

        // GET: api/PaymentExternal/GetFeatures
        [HttpGet("GetFeatures")]
        public async Task<ActionResult<List<string>>> GetFeatures()
        {
            return await _service.GetFeatures();
        }

        // Send the payment link to the customer
        [HttpPost("sendPaymentLink/{id}")]
        public async Task<IActionResult> SendPaymentLink(int id)
        {
            var result = await _service.SendPaymentLinkByEmailAsync(id);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        // GET: api/PaymentExternal/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentExternal>> GetPaymentExternal(int id)
        {
            var paymentExternal = await _service.GetByIdAsync(id);

            if (paymentExternal == null)
            {
                return NotFound();
            }

            return paymentExternal;
        }

        // POST: api/PaymentExternal
        [HttpPost]
        public async Task<ActionResult<PaymentExternal>> PostPaymentExternal(PaymentExternal paymentExternal)
        {
            var created = await _service.CreateAsync(paymentExternal);
            return CreatedAtAction("GetPaymentExternal", new { id = created.Id }, created);
        }

        // PUT: api/PaymentExternal/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentExternal(int id, PaymentExternal paymentExternal)
        {
            var result = await _service.UpdateAsync(id, paymentExternal);

            if (!result)
            {
                return BadRequest();
            }

            return NoContent();
        }

        // DELETE: api/PaymentExternal/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentExternal(int id)
        {
            var result = await _service.DeleteAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // Generate Payment Url link
        [HttpGet("generatePaymentUrl/{id}")]
        public async Task<ActionResult<PaymentExternal>> GeneratePaymentUrl(int id)
        {
            var paymentExternal = await _service.GeneratePaymentUrlAsync(id);
            if (paymentExternal == null)
            {
                return NotFound();
            }
           return Ok(paymentExternal);
        }

        // Send checkout page with expiry datetime to customer
        [HttpPost("sendCheckoutPage/{id}")]
        public async Task<IActionResult> SendCheckoutPage(int id, PaymentExternal paymentExternal)
        {
            var result = await _service.SendCheckoutPageAsync(id, paymentExternal);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
