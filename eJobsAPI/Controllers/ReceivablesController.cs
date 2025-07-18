using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using eJobsAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace eJobsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceivablesController : ControllerBase
    {
        private readonly JobDbContext _context;
        private readonly IReceivablesServices _receivablesServices;


        public ReceivablesController(JobDbContext context, IReceivablesServices receivablesServices)
        {
            _context = context;
            _receivablesServices = receivablesServices;
        }


        // GET: api/Receivables/GetList
        [HttpGet("GetList")]
        public async Task<ActionResult<IEnumerable<ReceivablesListData>>> GetList()
        {
           return await _receivablesServices.GetReceivablesList();
        }

        // GET: api/Receivables/GetList
        [HttpGet("GetListByDate/{dateFrom}/{dateTo}")]
        public async Task<IEnumerable<ReceivablesListData>> GetListByDate(DateTime dateFrom, DateTime dateTo)
        {
            return await _receivablesServices.GetReceivablesList(dateFrom, dateTo);
        }

        // GET: api/Expenses/GetList
        [HttpGet("Search/{dateFrom}/{dateTo}/{options}")]
        public async Task<IEnumerable<ReceivablesListData>> Search(DateTime dateFrom, DateTime dateTo, string options)
        {

            return await _receivablesServices.Search(dateFrom, dateTo, options);

        }

    }
}
