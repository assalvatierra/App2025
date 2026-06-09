using AngularApp1.Server.DBLayer;
using AngularApp1.Server.DTOs;
using Erp.Domain.Models;

namespace AngularApp1.Server.DBServices
{
    public class JobMainsService : IJobMainsService
    {
        private readonly IJobMainsDbLayer _db;

        public JobMainsService(IJobMainsDbLayer db)
        {
            _db = db;
        }

        public async Task<List<JobMain>> GetAllAsync()
        {
            return await _db.GetAllAsync();
        }

        public async Task<List<JobMainListDto>> GetListAsync()
        {
            var jobs = await _db.GetJobsWithDetailsAsync();
            var jobIds = jobs.Select(j => j.Id).ToList();

            var jobStatuses = await _db.GetJobStatusesByJobIdsAsync(jobIds);

            var statusIds = jobStatuses.Select(s => s.ItemStatusId).Where(id => id.HasValue).Select(id => id!.Value).Distinct().ToList();
            var itemStatuses = await _db.GetItemStatusesByIdsAsync(statusIds);

            var checklistTransactions = await _db.GetChecklistTransactionsByJobIdsAsync(jobIds);

            return jobs.Select(job =>
            {
                var jobTrx = checklistTransactions.Where(t => t.RefId == job.Id).ToList();
                int? progress = jobTrx.Count > 0
                    ? (int?)Math.Round((double)jobTrx.Count(t => t.IsDone) / jobTrx.Count * 100)
                    : null;

                var primaryCustomer = job.JobCustomers.FirstOrDefault(c => c.IsPrimary);
                var primaryCustomerName = primaryCustomer?.Customer?.Name ?? string.Empty;

                var latestStatus = jobStatuses
                    .Where(s => s.JobMainId == job.Id)
                    .OrderByDescending(s => s.CreatedOn)
                    .FirstOrDefault();
                var latestStatusName = latestStatus != null
                    ? itemStatuses.FirstOrDefault(i => i.Id == latestStatus.ItemStatusId)?.Name ?? string.Empty
                    : string.Empty;

                return new JobMainListDto
                {
                    Id = job.Id,
                    JobDate = job.JobDate,
                    Description = job.Description,
                    CreatedBy = job.CreatedBy,
                    CreatedOn = job.CreatedOn,
                    LastEditBy = job.LastEditBy,
                    LastEditOn = job.LastEditOn,
                    ItemStatusId = job.ItemStatusId,
                    BusinessUnitId = job.BusinessUnitId,
                    BusinessUnitName = job.BusinessUnit?.Name ?? string.Empty,
                    PrimaryCustomerName = primaryCustomerName,
                    LatestStatusName = latestStatusName,
                    Progress = progress
                };
            }).ToList();
        }

        public async Task<JobMain?> GetByIdAsync(int id)
        {
            return await _db.GetByIdAsync(id);
        }

        public async Task<JobMain?> GetByRecordGuidAsync(string recordGuid)
        {
            return await _db.GetByRecordGuidAsync(recordGuid);
        }

        public async Task UpdateAsync(JobMain jobMain)
        {
            await _db.UpdateAsync(jobMain);
        }

        public async Task<JobMain> AddAsync(JobMain jobMain)
        {
            return await _db.AddAsync(jobMain);
        }

        public async Task DeleteAsync(JobMain jobMain)
        {
            await _db.DeleteAsync(jobMain);
        }

        public bool Exists(int id)
        {
            return _db.Exists(id);
        }
    }
}
