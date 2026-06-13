using Erp.Domain.Models;

namespace AngularApp1.Server.DBServices
{
    public interface IJobServicesService
    {
        Task<IEnumerable<JobService>> GetAllAsync();
        Task<IEnumerable<JobService>> GetByJobIdAsync(int jobId);
        Task<JobService?> GetByIdAsync(int id);
        Task<JobService> AddAsync(JobService jobService);
        Task UpdateAsync(int id, JobService jobService);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
