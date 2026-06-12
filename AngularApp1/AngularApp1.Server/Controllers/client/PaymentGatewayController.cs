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

        public PaymentGatewayController(StripeClient client)
        {
            _client = client;
        }



        [HttpPost]
        public ActionResult CreateCheckoutSession()
        {
            var lineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    Quantity = 1,
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        UnitAmount = 1999, // amount in cents
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "The Services",
                            Description = "Description of the services provided"
                        }
                    }
                }
            };

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
            var PRICE_ID = "price_1ThMQcLMPo8IePrLEc3JZ01T";
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
