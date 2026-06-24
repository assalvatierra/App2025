using AngularApp1.Server.DBLayer;
using AngularApp1.Server.DTOs;
using Erp.Domain.Models;

namespace AngularApp1.Server.DBServices
{
    public class JobServiceBudgetService : IJobServiceBudgetService
    {
        private readonly IJobServiceBudgetDbLayer _db;

        public JobServiceBudgetService(IJobServiceBudgetDbLayer db)
        {
            _db = db;
        }

        public async Task<List<JobServiceBudget>> GetAllAsync()
        {
            return await _db.GetAllAsync();
        }

        public async Task<List<JobServiceBudget>> GetByJobMainIdAsync(int jobMainId)
        {
            return await _db.GetByJobMainIdAsync(jobMainId);
        }

        public async Task<List<JobServiceBudgetListDto>> GetByJobMainIdWithBudgetForecastAsync(int jobMainId)
        {
            var jobServiceBudgets = await _db.GetByJobMainIdAsync(jobMainId);


            // Map the JobServiceBudget entities to JobServiceBudgetListDto
            var jobServiceBudgetListDtos = jobServiceBudgets.Select(jsb => new JobServiceBudgetListDto
            {
                Id = jsb.Id,
                Amount = jsb.Amount,
                JobMainId = jsb.JobMainId,
                JobServiceId = jsb.JobServiceId,
                Remarks = jsb.Remarks,
                ItemStatusId = jsb.ItemStatusId,
                ItemTypeId = jsb.ItemTypeId,
                // Add other properties as needed

                ItemStatusName = jsb.ItemStatus?.Name ?? string.Empty,
                ItemTypeName = jsb.ItemType?.Name ?? string.Empty
            }).ToList();

            return jobServiceBudgetListDtos;
        }
        public async Task<JobServiceBudget?> GetByIdAsync(int id)
        {
            return await _db.GetByIdAsync(id);
        }

        public async Task<JobServiceBudget?> GetByRecordGuidAsync(Guid recordGuid)
        {
            return await _db.GetByRecordGuidAsync(recordGuid);
        }

        public async Task UpdateAsync(JobServiceBudget jobServiceBudget)
        {
            await _db.UpdateAsync(jobServiceBudget);
        }

        public async Task<JobServiceBudget> AddAsync(JobServiceBudget jobServiceBudget)
        {
            if (jobServiceBudget.RecordGuid == null || jobServiceBudget.RecordGuid == Guid.Empty)
            {
                jobServiceBudget.RecordGuid = Guid.NewGuid();
            }
            return await _db.AddAsync(jobServiceBudget);
        }

        public async Task DeleteAsync(JobServiceBudget jobServiceBudget)
        {
            await _db.DeleteAsync(jobServiceBudget);
        }

        public bool Exists(int id)
        {
            return _db.Exists(id);
        }
    }
}
