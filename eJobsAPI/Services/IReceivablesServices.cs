using eJobs.Model;
using eJobsAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace eJobsAPI.Services
{
    public interface IReceivablesServices
    {
        public Task<ActionResult<IEnumerable<ReceivablesListData>>> GetReceivablesList();
    }
}
