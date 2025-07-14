using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using eJobsAPI.Services;

namespace eJobsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly JobDbContext _context;
        private readonly IJobsServices _jobsServices;

        public JobsController(JobDbContext context, IJobsServices jobsServices)
        {
            _context = context;
            _jobsServices = jobsServices;
        }


        // GET: api/Jobs/GetQuicklist
        [HttpGet("GetQuicklist")]
        public async Task<ActionResult<IEnumerable<JobQuickListData>>> GetQuicklist()
        {
            return await _jobsServices.GetActiveJobs();
        }

    }

}
