using eJobs.Model;
using eJobsAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace eJobsAPI.Services
{
    public interface IReceivablesServices
    {
        public Task<ActionResult<IEnumerable<ReceivablesListData>>> GetReceivablesList();
        public Task<IEnumerable<ReceivablesListData>> GetReceivablesList(DateTime dateFrom, DateTime dateTo);

        public Task<IEnumerable<ReceivablesListData>> Search(DateTime dateFrom, DateTime dateTo, string options);
    }
}
