using Erp.Domain.Models;
using AngularApp1.Server.DTOs;

namespace AngularApp1.Server.DBServices
{
    public interface IJobServiceBudgetService
    {
        Task<List<JobServiceBudget>> GetAllAsync();
        Task<List<JobServiceBudget>> GetByJobMainIdAsync(int jobMainId);
        Task<List<JobServiceBudgetListDto>> GetByJobMainIdWithBudgetForecastAsync(int jobMainId);
        Task<JobServiceBudget?> GetByIdAsync(int id);
        Task<JobServiceBudget?> GetByRecordGuidAsync(Guid recordGuid);
        Task UpdateAsync(JobServiceBudget jobServiceBudget);
        Task<JobServiceBudget> AddAsync(JobServiceBudget jobServiceBudget);
        Task DeleteAsync(JobServiceBudget jobServiceBudget);
        bool Exists(int id);
    }
}
