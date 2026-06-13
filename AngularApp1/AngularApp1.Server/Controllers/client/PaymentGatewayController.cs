using AngularApp1.Server.DBServices;
using eJobs.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace AngularApp1.Server.Controllers.client
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentGatewayController : ControllerBase
    {

        private readonly StripeClient _client;
        private readonly IJobMainsService _JobService;
        private readonly IJobServicesService _JobServicesService;

        public PaymentGatewayController(
            StripeClient client,
            IJobMainsService jobservice,
            IJobServicesService jobServicesService
            )
        {
            _client = client;
            _JobService = jobservice;
            _JobServicesService = jobServicesService;
        }



        [HttpPost("CreateCheckoutSession")]
        public async Task<ActionResult> CreateCheckoutSession([FromQuery] string recordGuid)
        {
            var jobMain = await this._JobService.GetByRecordGuidAsync(recordGuid);
            var jobServices = await this._JobServicesService.GetByJobIdAsync(jobMain.Id);
            var JobAmount = (long) jobServices?.Sum(s => s.QuotedAmt) * 100; // Convert to cents 

            var lineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    Quantity = 1,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        UnitAmount = JobAmount, // amount in cents
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "Services",
                            Description = jobMain.Description
                        }
                    }
                }
            };

            //var PRICE_ID = "price_1ThMQcLMPo8IePrLEc3JZ01T";
            // var lineItems = new List<SessionLineItemOptions>
            // {
            //     new SessionLineItemOptions
            //     {
            //     // Provide the exact Price ID (for example, price_1234) of the product you want to sell
            //     Price = "{{PRICE_ID}}",
            //     Quantity = 1,
            //     },
            // };



            var domain = "https://localhost:51099";
            var options = new SessionCreateOptions
            {
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = domain + "/payment/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = domain + "/payment/cancel",
            };
            Session session = _client.V1.Checkout.Sessions.Create(options);

            // Return JSON response with checkout URL for Angular client
            return Ok(new { url = session.Url, sessionId = session.Id });
        }


    }
}
