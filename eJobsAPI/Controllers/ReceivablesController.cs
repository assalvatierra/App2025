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


    }
}
