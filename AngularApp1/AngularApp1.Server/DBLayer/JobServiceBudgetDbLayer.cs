using AngularApp1.Server.Data;
using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.DBLayer
{
    public class JobServiceBudgetDbLayer : IJobServiceBudgetDbLayer
    {
        private readonly ErpDbContext _context;

        public JobServiceBudgetDbLayer(ErpDbContext context)
        {
            _context = context;
        }

        public async Task<List<JobServiceBudget>> GetAllAsync()
        {
            return await _context.JobServiceBudgets.ToListAsync();
        }

        public async Task<List<JobServiceBudget>> GetByJobMainIdAsync(int jobMainId)
        {
            return await _context.JobServiceBudgets
                .Where(b => b.JobMainId == jobMainId)
                .ToListAsync();
        }

        public async Task<JobServiceBudget?> GetByIdAsync(int id)
        {
            return await _context.JobServiceBudgets.FindAsync(id);
        }

        public async Task<JobServiceBudget?> GetByRecordGuidAsync(Guid recordGuid)
        {
            return await _context.JobServiceBudgets
                .FirstOrDefaultAsync(b => b.RecordGuid == recordGuid);
        }

        public async Task UpdateAsync(JobServiceBudget jobServiceBudget)
        {
            _context.Entry(jobServiceBudget).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<JobServiceBudget> AddAsync(JobServiceBudget jobServiceBudget)
        {
            _context.JobServiceBudgets.Add(jobServiceBudget);
            await _context.SaveChangesAsync();
            return jobServiceBudget;
        }

        public async Task DeleteAsync(JobServiceBudget jobServiceBudget)
        {
            _context.JobServiceBudgets.Remove(jobServiceBudget);
            await _context.SaveChangesAsync();
        }

        public bool Exists(int id)
        {
            return _context.JobServiceBudgets.Any(e => e.Id == id);
        }
    }
}
