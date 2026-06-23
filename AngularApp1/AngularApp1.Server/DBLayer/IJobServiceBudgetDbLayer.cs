using Erp.Domain.Models;

namespace AngularApp1.Server.DBLayer
{
    public interface IJobServiceBudgetDbLayer
    {
        Task<List<JobServiceBudget>> GetAllAsync();
        Task<List<JobServiceBudget>> GetByJobMainIdAsync(int jobMainId);
        Task<JobServiceBudget?> GetByIdAsync(int id);
        Task<JobServiceBudget?> GetByRecordGuidAsync(Guid recordGuid);
        Task UpdateAsync(JobServiceBudget jobServiceBudget);
        Task<JobServiceBudget> AddAsync(JobServiceBudget jobServiceBudget);
        Task DeleteAsync(JobServiceBudget jobServiceBudget);
        bool Exists(int id);
    }
}
