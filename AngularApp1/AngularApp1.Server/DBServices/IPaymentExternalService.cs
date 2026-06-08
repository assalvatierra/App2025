using Erp.Domain.Models;

namespace AngularApp1.Server.DBServices
{
    public interface IPaymentExternalService
    {
        Task<List<PaymentExternal>> GetAllAsync();
        Task<PaymentExternal?> GetByIdAsync(int id);
        Task<List<PaymentExternal>> GetByJobMainIdAsync(int jobMainId);
        Task<PaymentExternal> CreateAsync(PaymentExternal paymentExternal);
        Task<bool> UpdateAsync(int id, PaymentExternal paymentExternal);
        Task<bool> DeleteAsync(int id);
        Task<PaymentExternal> GeneratePaymentUrlAsync(int id);
        Task<bool> SendPaymentLinkByEmailAsync(int id);
        Task<PaymongoJsonInfo> GetPaymongoPaymentLinkByIdAsync(string paymentLinkId);
    }
}
