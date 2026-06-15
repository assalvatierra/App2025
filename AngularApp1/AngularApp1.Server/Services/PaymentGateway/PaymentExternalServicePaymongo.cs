using AngularApp1.Server.DBLayer;
using AngularApp1.Server.DBServices;
using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace AngularApp1.Server.Services.PaymentGateway
{
    public class PaymentExternalServicePaymongo : IPaymentExternalService
    {
        private readonly IPaymentExternalDbLayer _db;
        private readonly IJobMainsService _jobMainsService;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private IEmailService _emailService;

        public PaymentExternalServicePaymongo(
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
            return Task.FromResult("PayMongo");
        }

        public Task<List<String>> GetFeatures()
        {
            //return Task.FromResult(new List<string> { "PaymentLink"});
            return Task.FromResult(new List<string> { "PaymentLink", "CheckoutPage" });
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

            foreach (var payment in payments)
            {
                if (string.IsNullOrEmpty(payment.JsonInfo))
                    continue;

                var jsonInfo = JsonSerializer.Deserialize<PaymentExternalJsonInfo>(
                    payment.JsonInfo,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );

                if (jsonInfo == null || string.IsNullOrEmpty(jsonInfo.ExternalReference))
                    continue;

                // use GetPaymongoPaymentLinkByIdAsync to get the latest status by reference number, since the payment link ID may not be the same as the reference number stored in JsonInfo
                var linkDetails = await GetPaymongoPaymentLinkByIdAsync(jsonInfo.PaymongoId);
                if (linkDetails != null && jsonInfo.PaymongoStatus != linkDetails.PaymongoStatus)
                {
                    jsonInfo.PaymongoStatus = linkDetails.PaymongoStatus;
                    payment.JsonInfo = JsonSerializer.Serialize(jsonInfo,
                        new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
                    await _db.UpdateAsync(payment);
                }
            }

            await _db.SaveChangesAsync();
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
            var paymentExternal = await _db.GetByIdAsync(id);
            if (paymentExternal == null)
            {
                throw new KeyNotFoundException("PaymentExternal not found");
            }

            // GeneratePaymongoPaymentLinkAsync updates paymentExternal.JsonInfo internally
            PaymentExternalJsonInfo mongoinfo = await GeneratePaymongoPaymentLinkAsync(paymentExternal);
            paymentExternal.JsonInfo = JsonSerializer.Serialize(mongoinfo,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            paymentExternal.ExternalId = mongoinfo.PaymongoId;
            await _db.UpdateAsync(paymentExternal);
            await _db.SaveChangesAsync();

            return paymentExternal;
        }

        public async Task<bool> SendPaymentLinkByEmailAsync(int id)
        {
            var paymentExternal = await _db.GetByIdAsync(id);
            if (paymentExternal == null)
            {
                return false;
            }

            //get payment link from JsonInfo
            var paymentLink = string.Empty;
            var additionalMessage = string.Empty;
            if (paymentExternal != null)
            {
                additionalMessage = $"Amount: {paymentExternal.Amount} {paymentExternal.Currency}\n";

                if (!string.IsNullOrEmpty(paymentExternal.JsonInfo))
                {
                    var jsonInfo = JsonSerializer.Deserialize<PaymentExternalJsonInfo>(
                        paymentExternal.JsonInfo,
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                    );
                    if (jsonInfo != null)
                    {
                        paymentLink = jsonInfo.PaymentLink ?? string.Empty;
                    }
                }
            }

            if (string.IsNullOrEmpty(paymentLink))
            {
                return false;
            }

            //get customer email from JsonInfo (ReceiptEmail)
            string[] customerEmail = Array.Empty<string>();
            string emailMessage = string.Empty;

            if (!string.IsNullOrEmpty(paymentExternal.JsonInfo))
            {
                var jsonInfo = JsonSerializer.Deserialize<PaymentExternalJsonInfo>(
                    paymentExternal.JsonInfo,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );
                if (jsonInfo != null)
                {
                    customerEmail = new[] { jsonInfo.ReceiptEmail ?? string.Empty };
                    emailMessage = jsonInfo.EmailMessage ?? string.Empty;
                }
            }

            await _emailService.SendEmailAsync(
                customerEmail,
                Array.Empty<string>(),
                Array.Empty<string>(),
                "Realbreeze Travel & Tours - Payment Link",
                $"For the services requested\n<br>" +
                $"Total Due: {paymentExternal.Amount} {paymentExternal.Currency}\n<br>" +
                $"{emailMessage}\n<br>" +
                $"Please use the following link to make your payment: \n<br>" +
                $"<a href=\"{paymentLink}\">{paymentLink}</a>"

                );

            return true;
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

        private async Task<string?> GetPaymongoStatusByReferenceAsync(string referenceNumber)
        {
            try
            {
                var secretKey = _configuration["Paymongo:SecretKey"] ?? string.Empty;
                if (string.IsNullOrEmpty(secretKey))
                    throw new InvalidOperationException("Paymongo:SecretKey is not configured.");

                var encodedKey = Convert.ToBase64String(Encoding.UTF8.GetBytes(secretKey + ":"));

                var client = _httpClientFactory.CreateClient();

                // Try fetching by reference_number query filter first
                var request = new HttpRequestMessage(
                    HttpMethod.Get,
                    $"https://api.paymongo.com/v1/links?reference_number={referenceNumber}"
                );
                request.Headers.Authorization = new AuthenticationHeaderValue("Basic", encodedKey);

                var response = await client.SendAsync(request);
                if (!response.IsSuccessStatusCode)
                {
                    var errorBody = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException(
                        $"Paymongo API returned {(int)response.StatusCode} ({response.ReasonPhrase}): {errorBody}");
                }

                var responseBody = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(responseBody);

                var dataElement = doc.RootElement.GetProperty("data");

                // GET /v1/links returns data as an array when filtering by reference_number
                if (dataElement.ValueKind == JsonValueKind.Array)
                {
                    if (dataElement.GetArrayLength() == 0)
                        throw new InvalidOperationException(
                            $"Paymongo returned an empty data array for reference_number '{referenceNumber}'. " +
                            "Verify the stored reference_number matches the value in Paymongo's attributes.reference_number field.");

                    return dataElement[0]
                        .GetProperty("attributes")
                        .GetProperty("status")
                        .GetString();
                }

                // Fallback: data returned as a single object (e.g. when referenceNumber is actually a link id)
                if (dataElement.ValueKind == JsonValueKind.Object)
                {
                    return dataElement
                        .GetProperty("attributes")
                        .GetProperty("status")
                        .GetString();
                }

                throw new InvalidOperationException(
                    $"Unexpected Paymongo response shape for reference_number '{referenceNumber}': data is {dataElement.ValueKind}.");
            }
            catch (Exception ex)
            {
                // Log the error so it can be diagnosed; returning null avoids disrupting the main flow
                Console.Error.WriteLine($"[GetPaymongoStatusByReferenceAsync] Failed for reference '{referenceNumber}': {ex.Message}");
                return null;
            }
        }

        private async Task<PaymentExternalJsonInfo?> GetPaymongoPaymentLinkByIdAsync(string paymentLinkId)
        {
            try
            {
                var secretKey = _configuration["Paymongo:SecretKey"] ?? string.Empty;
                if (string.IsNullOrEmpty(secretKey))
                    throw new InvalidOperationException("Paymongo:SecretKey is not configured.");

                var encodedKey = Convert.ToBase64String(Encoding.UTF8.GetBytes(secretKey + ":"));

                var client = _httpClientFactory.CreateClient();
                var request = new HttpRequestMessage(
                    HttpMethod.Get,
                    $"https://api.paymongo.com/v1/payment_links/{paymentLinkId}"
                );
                request.Headers.Authorization = new AuthenticationHeaderValue("Basic", encodedKey);
                request.Headers.Add("accept", "application/json");

                var response = await client.SendAsync(request);
                if (!response.IsSuccessStatusCode)
                {
                    var errorBody = await response.Content.ReadAsStringAsync();
                    throw new HttpRequestException(
                        $"Paymongo API returned {(int)response.StatusCode} ({response.ReasonPhrase}): {errorBody}");
                }

                var responseBody = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(responseBody);
                var attributes = doc.RootElement.GetProperty("data");

                var checkoutUrl = attributes.GetProperty("url").GetString() ?? string.Empty;
                var referenceNumber = attributes.GetProperty("reference_number").GetString() ?? string.Empty;
                var status = attributes.GetProperty("status").GetString() ?? string.Empty;

                var linkinfo = new PaymentExternalJsonInfo
                {
                    PaymentLink = checkoutUrl,
                    ExternalReference = referenceNumber,
                    PaymongoStatus = status,
                    PaymongoId = paymentLinkId
                };


                return linkinfo;
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"[GetPaymongoPaymentLinkByIdAsync] Failed for id '{paymentLinkId}': {ex.Message}");
                return null;
            }
        }

        //TO-DO: move this to a separate PaymongoService class if we add more Paymongo-related methods in the future
        private async Task<PaymentExternalJsonInfo> GeneratePaymongoPaymentLinkAsync(PaymentExternal paymentExternal)
        {
            var secretKey = _configuration["Paymongo:SecretKey"] ?? string.Empty;
            var encodedKey = Convert.ToBase64String(Encoding.UTF8.GetBytes(secretKey + ":"));

            // Paymongo amounts are in centavos (smallest currency unit)
            var amountInCentavos = (int)(paymentExternal.Amount * 100);

            var existingInfo = new PaymentExternalJsonInfo();
            if (!string.IsNullOrEmpty(paymentExternal.JsonInfo))
            {
                existingInfo = JsonSerializer.Deserialize<PaymentExternalJsonInfo>(
                    paymentExternal.JsonInfo,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                ) ?? existingInfo;
            }

            var payload = new
            {
                data = new
                {
                    attributes = new
                    {
                        amount = amountInCentavos,
                        currency = paymentExternal.Currency ?? "PHP",
                        description = existingInfo.Description
                    }
                }
            };

            var json = JsonSerializer.Serialize(payload);
            var client = _httpClientFactory.CreateClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.paymongo.com/v1/links");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", encodedKey);
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseBody);

            var attributes = doc.RootElement
                .GetProperty("data")
                .GetProperty("attributes");

            var checkoutUrl = attributes.GetProperty("checkout_url").GetString() ?? string.Empty;
            var referenceNumber = attributes.GetProperty("reference_number").GetString() ?? string.Empty;
            var status = attributes.GetProperty("status").GetString() ?? string.Empty;
            var referenceId = doc.RootElement.GetProperty("data").GetProperty("id").GetString() ?? string.Empty;
            // Update existingInfo with Paymongo response fields
            existingInfo.ExternalReference = referenceNumber;
            existingInfo.PaymongoStatus = status;
            existingInfo.PaymentLink = checkoutUrl;
            existingInfo.PaymongoId = referenceId;

            return existingInfo;
        }
    }
}
