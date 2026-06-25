using Erp.Domain.Models;

namespace AngularApp1.Server.DTOs
{
    public class JobServiceBudgetListDto: JobServiceBudget
    {
        public string JobServiceName { get; set; } = string.Empty;
        public string ItemStatusName { get; set; } = string.Empty;
        public string ItemTypeName { get; set; } = string.Empty;
        public decimal? ForecastAmount { get; set; }
        public decimal? ActualAmount { get; set; }

    }
}
