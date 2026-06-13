using AngularApp1.Server.DBLayer;
using Erp.Domain.Models;

namespace AngularApp1.Server.DBServices
{
    public class JobServicesService : IJobServicesService
    {
        private readonly IJobServicesDbLayer _db;

        public JobServicesService(IJobServicesDbLayer db)
        {
            _db = db;
        }

        public async Task<IEnumerable<JobService>> GetAllAsync()
        {
            return await _db.GetAllAsync();
        }

        public async Task<IEnumerable<JobService>> GetByJobIdAsync(int jobId)
        {
            return await _db.GetByJobIdAsync(jobId);
        }

        public async Task<JobService?> GetByIdAsync(int id)
        {
            return await _db.GetByIdAsync(id);
        }

        public async Task<JobService> AddAsync(JobService jobService)
        {
            return await _db.AddAsync(jobService);
        }

        public async Task UpdateAsync(int id, JobService jobService)
        {
            if (id != jobService.Id)
            {
                throw new ArgumentException("ID mismatch between route and entity");
            }

            await _db.UpdateAsync(jobService);
        }

        public async Task DeleteAsync(int id)
        {
            var jobService = await _db.GetByIdAsync(id);
            if (jobService == null)
            {
                throw new KeyNotFoundException($"JobService with ID {id} not found");
            }

            await _db.DeleteAsync(jobService);
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _db.ExistsAsync(id);
        }
    }
}
