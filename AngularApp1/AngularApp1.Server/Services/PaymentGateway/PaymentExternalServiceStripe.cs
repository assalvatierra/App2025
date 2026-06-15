using AngularApp1.Server.DBLayer;
using AngularApp1.Server.DBServices;
using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace AngularApp1.Server.Services.PaymentGateway
{
    public class PaymentExternalServiceStripe : IPaymentExternalService
    {
        private readonly IPaymentExternalDbLayer _db;
        private readonly IJobMainsService _jobMainsService;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private IEmailService _emailService;

        public PaymentExternalServiceStripe(
            IPaymentExternalDbLayer db,
            IJobMainsService jobMainsService,
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration,
            IEmailService emailService
            )
        {
            _db = db;
            _jobMainsService = jobMainsService; 
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _emailService = emailService;
        }

        public Task<string> GetPlatformName()
        {
            return Task.FromResult("Stripe");
        }

        public Task<List<String>> GetFeatures()
        {
            return Task.FromResult(new List<string> { "CheckoutPage" });
        }

        public async Task<List<PaymentExternal>> GetAllAsync()
        {
            return await _db.GetAllAsync();
        }

        public async Task<PaymentExternal?> GetByIdAsync(int id)
        {
            return await _db.GetByIdAsync(id);
        }

        public async Task<List<PaymentExternal>> GetByJobMainIdAsync(int jobMainId)
        {
            var payments = await _db.GetByJobMainIdAsync(jobMainId);

            return payments;
        }

        public async Task<PaymentExternal> CreateAsync(PaymentExternal paymentExternal)
        {
            await _db.AddAsync(paymentExternal);
            await _db.SaveChangesAsync();
            return paymentExternal;
        }

        public async Task<bool> UpdateAsync(int id, PaymentExternal paymentExternal)
        {
            if (id != paymentExternal.Id)
                return false;

            await _db.UpdateAsync(paymentExternal);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_db.Exists(id))
                    return false;
                throw;
            }

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var paymentExternal = await _db.GetByIdAsync(id);
            if (paymentExternal == null)
                return false;

            await _db.DeleteAsync(paymentExternal);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<PaymentExternal> GeneratePaymentUrlAsync(int id)
        {
            throw new NotImplementedException("Payment link generation is not implemented for Stripe yet.");
        }

        public async Task<bool> SendPaymentLinkByEmailAsync(int id)
        {
            throw new NotImplementedException("Sending payment link by email is not implemented for Stripe yet.");
        }

        public async Task<bool> SendCheckoutPageAsync(int id, PaymentExternal paymentExternal)
        {
            var existingPayment = await _db.GetByIdAsync(id);
            if (existingPayment == null)
            {
                return false;
            }

            // Update the payment record with the new information from the client
            if (!string.IsNullOrEmpty(paymentExternal.JsonInfo))
            {
                existingPayment.JsonInfo = paymentExternal.JsonInfo;
            }

            //if (paymentExternal.ExternalId != null)
            //{
            //    existingPayment.ExternalId = paymentExternal.ExternalId;
            //}

            await _db.UpdateAsync(existingPayment);
            await _db.SaveChangesAsync();

            // Get payment link and receipt email from JsonInfo
            var checkoutLink = string.Empty;
            var customerEmail = Array.Empty<string>();
            var emailMessage = string.Empty;
            var expiryDateTime = string.Empty;

            var recordguid = string.Empty;
            if (paymentExternal.JobMainId != 0)
            {
                existingPayment.JobMainId = paymentExternal.JobMainId;
                _jobMainsService.GetByIdAsync((int)existingPayment.JobMainId)
                    .ContinueWith(jobMainTask =>
                    {
                        var jobMain = jobMainTask.Result;
                        if (jobMain != null)
                        {
                            recordguid = jobMain.RecordGuid.ToString();
                        }
                    }).Wait();
            }

            string sDomain = _configuration["AppSettings:Domain"] ?? "https://localhost:51099"; ;
            checkoutLink = sDomain + $"/client/job/{recordguid}";
            // Save the updated record

            if (!string.IsNullOrEmpty(existingPayment.JsonInfo))
            {
                var jsonInfo = JsonSerializer.Deserialize<PaymentExternalJsonInfo>(
                    existingPayment.JsonInfo,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );
                if (jsonInfo != null)
                {
                    customerEmail = new[] { jsonInfo.ReceiptEmail ?? string.Empty };
                    emailMessage = jsonInfo.EmailMessage ?? string.Empty;
                }
            }

            if (string.IsNullOrEmpty(checkoutLink) || customerEmail.Length == 0 || string.IsNullOrEmpty(customerEmail[0]))
            {
                return false;
            }

            // Construct email body with expiry information if available
            string emailBody = $"For the services requested<br>" +
                $"Total Due: {existingPayment.Amount} {existingPayment.Currency}<br>";

            if (!string.IsNullOrEmpty(emailMessage))
            {
                emailBody += $"{emailMessage}<br>";
            }

            emailBody += $"Please use the link for checkout:<br>" +
                $"<a href=\"{checkoutLink}\">{checkoutLink}</a>";

            await _emailService.SendEmailAsync(
                customerEmail,
                Array.Empty<string>(),
                Array.Empty<string>(),
                "Realbreeze Travel & Tours - Payment Checkout Link",
                emailBody
            );

            return true;
        }

    }
}
