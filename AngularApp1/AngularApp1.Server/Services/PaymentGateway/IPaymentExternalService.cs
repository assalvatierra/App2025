using AngularApp1.Server.DBServices;
using Erp.Domain.Models;

namespace AngularApp1.Server.Services.PaymentGateway
{
    public interface IPaymentExternalService
    {
        Task <string> GetPlatformName();
        Task<List<String>> GetFeatures();
        Task<List<PaymentExternal>> GetAllAsync();
        Task<PaymentExternal?> GetByIdAsync(int id);
        Task<List<PaymentExternal>> GetByJobMainIdAsync(int jobMainId);
        Task<PaymentExternal> CreateAsync(PaymentExternal paymentExternal);
        Task<bool> UpdateAsync(int id, PaymentExternal paymentExternal);
        Task<bool> DeleteAsync(int id);
        Task<PaymentExternal> GeneratePaymentUrlAsync(int id);
        Task<bool> SendPaymentLinkByEmailAsync(int id);
        Task<bool> SendCheckoutPageAsync(int id, PaymentExternal paymentExternal);
    }
}
