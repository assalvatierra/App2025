using Erp.Domain.Models;

namespace AngularApp1.Server.DBLayer
{
    public interface IJobMainsDbLayer
    {
        Task<List<JobMain>> GetAllAsync();
        Task<List<JobMain>> GetJobsWithDetailsAsync();
        Task<List<JobMainStatus>> GetJobStatusesByJobIdsAsync(List<int> jobIds);
        Task<List<ItemStatus>> GetItemStatusesByIdsAsync(List<int> statusIds);
        Task<List<ChecklistTransaction>> GetChecklistTransactionsByJobIdsAsync(List<int> jobIds);
        Task<JobMain?> GetByIdAsync(int id);
        Task<JobMain?> GetByRecordGuidAsync(string recordGuid);
        Task UpdateAsync(JobMain jobMain);
        Task<JobMain> AddAsync(JobMain jobMain);
        Task DeleteAsync(JobMain jobMain);
        bool Exists(int id);
    }
}
