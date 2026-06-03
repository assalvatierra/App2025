using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using AngularApp1.Server.DBLayer;
using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.DBServices
{
    public class PaymongoJsonInfo
    {
        public string Description { get; set; } = string.Empty;
        public string PaymongoReference { get; set; } = string.Empty;
        public string PaymongoStatus { get; set; } = string.Empty;
        public string PaymentLink { get; set; } = string.Empty;
        public string ReceiptEmail { get; set; } = string.Empty;
        public string EmailMessage { get; set; } = string.Empty;
    }

    public class PaymentExternalService : IPaymentExternalService
    {
        private readonly IPaymentExternalDbLayer _db;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public PaymentExternalService(IPaymentExternalDbLayer db, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _db = db;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
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
            return await _db.GetByJobMainIdAsync(jobMainId);
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
            PaymongoJsonInfo mongoinfo = await GeneratePaymongoPaymentLinkAsync(paymentExternal);
            paymentExternal.JsonInfo = JsonSerializer.Serialize(mongoinfo,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            await _db.UpdateAsync(paymentExternal);
            await _db.SaveChangesAsync();

            return paymentExternal;
        }


        private async Task<PaymongoJsonInfo> GeneratePaymongoPaymentLinkAsync(PaymentExternal paymentExternal)
        {
            var secretKey = _configuration["Paymongo:SecretKey"] ?? string.Empty;
            var encodedKey = Convert.ToBase64String(Encoding.UTF8.GetBytes(secretKey + ":"));

            // Paymongo amounts are in centavos (smallest currency unit)
            var amountInCentavos = (int)(paymentExternal.Amount * 100);

            var existingInfo = new PaymongoJsonInfo();
            if (!string.IsNullOrEmpty(paymentExternal.JsonInfo))
            {
                existingInfo = JsonSerializer.Deserialize<PaymongoJsonInfo>(
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

            // Update existingInfo with Paymongo response fields
            existingInfo.PaymongoReference = referenceNumber;
            existingInfo.PaymongoStatus = status;
            existingInfo.PaymentLink = checkoutUrl;

            return existingInfo;
        }
    }
}
