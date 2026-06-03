using AngularApp1.Server.Data;
using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.DBLayer
{
    public class PaymentExternalDbLayer : IPaymentExternalDbLayer
    {
        private readonly ErpDbContext _context;

        public PaymentExternalDbLayer(ErpDbContext context)
        {
            _context = context;
        }

        public async Task<List<PaymentExternal>> GetAllAsync()
        {
            return await _context.PaymentExternals.ToListAsync();
        }

        public async Task<PaymentExternal?> GetByIdAsync(int id)
        {
            return await _context.PaymentExternals.FindAsync(id);
        }

        public async Task<List<PaymentExternal>> GetByJobMainIdAsync(int jobMainId)
        {
            return await _context.PaymentExternals
                .Where(p => p.JobMainId == jobMainId)
                .ToListAsync();
        }

        public async Task AddAsync(PaymentExternal paymentExternal)
        {
            _context.PaymentExternals.Add(paymentExternal);
        }

        public async Task UpdateAsync(PaymentExternal paymentExternal)
        {
            _context.Entry(paymentExternal).State = EntityState.Modified;
        }

        public async Task DeleteAsync(PaymentExternal paymentExternal)
        {
            _context.PaymentExternals.Remove(paymentExternal);
        }

        public bool Exists(int id)
        {
            return _context.PaymentExternals.Any(e => e.Id == id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
