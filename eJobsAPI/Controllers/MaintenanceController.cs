using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using eJobsAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eJobsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceController : ControllerBase
    {

        private readonly JobDbContext _context;
        private IMaintenanceServices _maintenanceServices;

        public MaintenanceController(JobDbContext context, IMaintenanceServices maintenanceServices)
        {
            _context = context;
            _maintenanceServices = maintenanceServices;
        }

        // GET: api/Maintenance/GetList
        [HttpGet("GetList")]
        public async Task<IEnumerable<MaintenanceListData>> GetList()
        {
            return await _maintenanceServices.GetList();
        }

        // GET: api/Maintenance/GetList
        [HttpGet("GetListByDate/{dtFrom}/{dtTo}")]
        public async Task<IEnumerable<MaintenanceListData>> GetListByDate(DateTime dtFrom, DateTime dtTo)
        {
            return await _maintenanceServices.GetListByDate(dtFrom, dtTo);
        }


        // GET: api/Maintenance/GetList
        [HttpGet("Search/{dateFrom}/{dateTo}/{options}")]
        public async Task<IEnumerable<MaintenanceListData>> Search(DateTime dateFrom, DateTime dateTo, string options)
        {

            return await _maintenanceServices.Search(dateFrom, dateTo, options);

        }

        // GET: api/Expenses/GetList
        [HttpGet("GetSummary")]
        public async Task<IEnumerable<InvCarRecord>> GetSummary()
        {
            return await _context.InvCarRecords.TakeLast(20).ToListAsync();

        }

    }
}
