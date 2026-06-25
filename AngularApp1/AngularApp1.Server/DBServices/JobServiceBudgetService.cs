using AngularApp1.Server.DBLayer;
using AngularApp1.Server.DTOs;
using Erp.Domain.Models;
using System.Text.Json;

namespace AngularApp1.Server.DBServices
{
    public class JobBudgetCategorySetting
    {
        public string Measurement { get; set; }
        public string BudgetCategory { get; set; }
        public List<string> ResourceTypeNames { get; set; }
    }

    public class JobServiceBudgetService : IJobServiceBudgetService
    {
        private readonly IJobServiceBudgetDbLayer _db;
        private readonly IJobServicesDbLayer _dbJobService;

        public JobServiceBudgetService(
            IJobServiceBudgetDbLayer db,
            IJobServicesDbLayer dbJobService
            )
        {
            _db = db;
            _dbJobService = dbJobService;
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
            var jobServices = await _dbJobService.GetByJobIdAsync(jobMainId);

            // Get Budget Config
            List<JobBudgetCategorySetting> budgetCategories = new List<JobBudgetCategorySetting>();
            var budgetFeatureConfig = await _db.GetBudgetConfigAsync();
            if (budgetFeatureConfig != null && budgetFeatureConfig.Count > 0)
            {
                string sSettings = budgetFeatureConfig[0].Settings;
                using var doc = JsonDocument.Parse(sSettings);
                if (doc.RootElement.TryGetProperty("Categories", out var categoryElement))
                {
                    budgetCategories = JsonSerializer.Deserialize<List<JobBudgetCategorySetting>>(categoryElement.GetRawText())
                                       ?? new List<JobBudgetCategorySetting>();
                }
            }

            
            decimal forecastamount = 0;
            decimal actualamount = 0;
            var assignedResources = await _db.GetAssignedResourcesByJobMainIdAsync(jobMainId);

            // Map the JobServiceBudget entities to JobServiceBudgetListDto
            var jobServiceBudgetListDtos = jobServiceBudgets.Select(jsb =>
            {
                forecastamount = this.GetTotalForecastAmount(
                    jsb.ItemType?.Name ?? string.Empty,
                    budgetCategories, 
                    assignedResources);

                return new JobServiceBudgetListDto
                {
                    Id = jsb.Id,
                    Amount = jsb.Amount,
                    JobMainId = jsb.JobMainId,
                    JobServiceId = jsb.JobServiceId,
                    Remarks = jsb.Remarks,
                    ItemStatusId = jsb.ItemStatusId,
                    ItemTypeId = jsb.ItemTypeId,
                    ForecastAmount = forecastamount,
                    ActualAmount = actualamount,

                    JobServiceName =
                        jobServices.FirstOrDefault(js => js.Id == jsb.JobServiceId)?.Particulars ?? string.Empty,
                    ItemStatusName = jsb.ItemStatus?.Name ?? string.Empty,
                    ItemTypeName = jsb.ItemType?.Name ?? string.Empty
                };
            }).ToList();

            return jobServiceBudgetListDtos;
        }

        private decimal GetTotalForecastAmount(
            string budgetCategoryName,
            List<JobBudgetCategorySetting> budgetCategories,
            List<JobServiceResource> assignedResources
            )
        {
            decimal forecastamount = 0;

            if (string.IsNullOrEmpty(budgetCategoryName)) return 0;

            var itemBudgetCategories = budgetCategories.Where(bc => bc.BudgetCategory == budgetCategoryName).FirstOrDefault();
            if(itemBudgetCategories == null || itemBudgetCategories.ResourceTypeNames == null) return 0;

            List<string> resourceTypes = itemBudgetCategories.ResourceTypeNames;
            var assigned = assignedResources.Where(r => resourceTypes.Contains(r.Resource.ItemType.Name)).ToList();

            foreach (var item in assigned)
            {
                var dailyRate = item.Resource
                    .ResourceRates
                    .FirstOrDefault()
                    ?.Daily ?? 0;
                int qty = (item.JobService.DateEnd.Value.Date - item.JobService.DateStart.Value.Date).Days + 1;
                forecastamount += dailyRate * qty;
            }
            return forecastamount;
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
