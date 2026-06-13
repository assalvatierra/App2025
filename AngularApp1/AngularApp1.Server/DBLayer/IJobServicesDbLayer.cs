using Erp.Domain.Models;

namespace AngularApp1.Server.DBLayer
{
    public interface IJobServicesDbLayer
    {
        Task<List<JobService>> GetAllAsync();
        Task<List<JobService>> GetByJobIdAsync(int jobId);
        Task<JobService?> GetByIdAsync(int id);
        Task<JobService> AddAsync(JobService jobService);
        Task UpdateAsync(JobService jobService);
        Task DeleteAsync(JobService jobService);
        Task<bool> ExistsAsync(int id);
    }
}
