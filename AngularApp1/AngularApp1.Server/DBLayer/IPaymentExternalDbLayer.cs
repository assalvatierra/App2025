using Erp.Domain.Models;

namespace AngularApp1.Server.DBLayer
{
    public interface IPaymentExternalDbLayer
    {
        Task<List<PaymentExternal>> GetAllAsync();
        Task<PaymentExternal?> GetByIdAsync(int id);
        Task<List<PaymentExternal>> GetByJobMainIdAsync(int jobMainId);
        Task AddAsync(PaymentExternal paymentExternal);
        Task UpdateAsync(PaymentExternal paymentExternal);
        Task DeleteAsync(PaymentExternal paymentExternal);
        bool Exists(int id);
        Task SaveChangesAsync();
    }
}
