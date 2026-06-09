using AngularApp1.Server.DBServices;
using Erp.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularApp1.Server.Controllers.client
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobOrderController : ControllerBase
    {
        private readonly IJobMainsService _service;

        public JobOrderController(IJobMainsService service)
        {
            _service = service;
        }

        // GET: api/JobOrder/byguid/{recordGuid}
        [HttpGet("byguid/{recordGuid}")]
        public async Task<ActionResult<JobMain>> GetByRecordGuid(string recordGuid)
        {
            var jobMain = await _service.GetByRecordGuidAsync(recordGuid);

            if (jobMain == null)
            {
                return NotFound();
            }

            return jobMain;
        }
    }
}
