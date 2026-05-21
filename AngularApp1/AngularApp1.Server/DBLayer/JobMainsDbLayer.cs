using AngularApp1.Server.Data;
using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.DBLayer
{
    public class JobMainsDbLayer
    {
        private readonly ErpDbContext _context;

        public JobMainsDbLayer(ErpDbContext context)
        {
            _context = context;
        }

        public async Task<List<JobMain>> GetAllAsync()
        {
            return await _context.JobMain.ToListAsync();
        }

        public async Task<List<JobMain>> GetJobsWithDetailsAsync()
        {
            return await _context.JobMain
                .Include(j => j.BusinessUnit)
                .Include(j => j.JobCustomers)
                    .ThenInclude(jc => jc.Customer)
                .ToListAsync();
        }

        public async Task<List<JobMainStatus>> GetJobStatusesByJobIdsAsync(List<int> jobIds)
        {
            return await _context.JobMainStatus
                .Where(s => s.JobMainId != null && jobIds.Contains(s.JobMainId.Value))
                .ToListAsync();
        }

        public async Task<List<ItemStatus>> GetItemStatusesByIdsAsync(List<int> statusIds)
        {
            return await _context.ItemStatus
                .Where(i => statusIds.Contains(i.Id))
                .ToListAsync();
        }

        public async Task<List<ChecklistTransaction>> GetChecklistTransactionsByJobIdsAsync(List<int> jobIds)
        {
            return await _context.ChecklistTransaction
                .Where(t => t.RefObject == "JOB" && t.RefId != null && jobIds.Contains(t.RefId.Value))
                .ToListAsync();
        }

        public async Task<JobMain?> GetByIdAsync(int id)
        {
            return await _context.JobMain.FindAsync(id);
        }

        public async Task UpdateAsync(JobMain jobMain)
        {
            _context.Entry(jobMain).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<JobMain> AddAsync(JobMain jobMain)
        {
            _context.JobMain.Add(jobMain);
            await _context.SaveChangesAsync();
            return jobMain;
        }

        public async Task DeleteAsync(JobMain jobMain)
        {
            _context.JobMain.Remove(jobMain);
            await _context.SaveChangesAsync();
        }

        public bool Exists(int id)
        {
            return _context.JobMain.Any(e => e.Id == id);
        }
    }
}
