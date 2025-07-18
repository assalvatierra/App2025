using eJobs.Model;
using eJobsAPI.Data;

namespace eJobsAPI.Services
{
    public interface IMaintenanceServices
    {
        public Task<IEnumerable<MaintenanceListData>> GetList();
        public Task<IEnumerable<MaintenanceListData>> GetListByDate(DateTime dateFrom, DateTime dateTo);
        public Task<IEnumerable<MaintenanceListData>> Search(DateTime dateFrom, DateTime dateTo, string options);
    }
}
