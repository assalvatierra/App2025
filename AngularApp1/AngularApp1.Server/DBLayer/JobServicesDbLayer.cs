using AngularApp1.Server.Data;
using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.DBLayer
{
    public class JobServicesDbLayer : IJobServicesDbLayer
    {
        private readonly ErpDbContext _context;

        public JobServicesDbLayer(ErpDbContext context)
        {
            _context = context;
        }

        public async Task<List<JobService>> GetAllAsync()
        {
            return await _context.JobService.ToListAsync();
        }

        public async Task<List<JobService>> GetByJobIdAsync(int jobId)
        {
            return await _context.JobService
                .Where(js => js.JobMainId == jobId)
                .Include(js => js.ServiceItem)
                .Include(js => js.ItemStatus)
                .ToListAsync();
        }

        public async Task<JobService?> GetByIdAsync(int id)
        {
            return await _context.JobService
                .Include(js => js.ServiceItem)
                .Include(js => js.ItemStatus)
                .FirstOrDefaultAsync(js => js.Id == id);
        }

        public async Task<JobService> AddAsync(JobService jobService)
        {
            _context.JobService.Add(jobService);
            await _context.SaveChangesAsync();
            return jobService;
        }

        public async Task UpdateAsync(JobService jobService)
        {
            _context.Entry(jobService).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(JobService jobService)
        {
            _context.JobService.Remove(jobService);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.JobService.AnyAsync(e => e.Id == id);
        }
    }
}
