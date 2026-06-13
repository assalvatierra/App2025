using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AngularApp1.Server.DBServices;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobServicesController : ControllerBase
    {
        private readonly IJobServicesService _service;

        public JobServicesController(IJobServicesService service)
        {
            _service = service;
        }

        // GET: api/JobServices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobService>>> GetJobService()
        {
            return Ok(await _service.GetAllAsync());
        }

        // GET: api/JobServices/byJob/5
        // This route must be defined BEFORE the {id} route to ensure correct matching
        [HttpGet("byJob/{JobId}")]
        public async Task<ActionResult<IEnumerable<JobService>>> GetJobServiceByJobId(int JobId)
        {
            var jobService = await _service.GetByJobIdAsync(JobId);
            return Ok(jobService);
        }

        // GET: api/JobServices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobService>> GetJobService(int id)
        {
            var jobService = await _service.GetByIdAsync(id);

            if (jobService == null)
            {
                return NotFound();
            }

            return jobService;
        }

        // PUT: api/JobServices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobService(int id, JobService jobService)
        {
            if (id != jobService.Id)
            {
                return BadRequest();
            }

            try
            {
                await _service.UpdateAsync(id, jobService);
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/JobServices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JobService>> PostJobService(JobService jobService)
        {
            var createdJobService = await _service.AddAsync(jobService);
            return CreatedAtAction("GetJobService", new { id = createdJobService.Id }, createdJobService);
        }

        // DELETE: api/JobServices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobService(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
