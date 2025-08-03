using eJobs.Model;
using eJobsAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace eJobsAPI.Services
{
    public interface IJobsServices
    {
        public Task<ActionResult<IList<JobMain>>> GetActiveJobs();
    }
}
