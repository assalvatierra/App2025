using AngularApp1.Server.DBServices;
using AngularApp1.Server.DTOs;
using AngularApp1.Server.Services.RabbitMQ;
using Erp.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JobServiceBudgetController : ControllerBase
    {
        private readonly IJobServiceBudgetService _service;
        private readonly IRabbitMqBasic? _rabbitmq;

        public JobServiceBudgetController(IJobServiceBudgetService service, IRabbitMqBasic? rabbitmq)
        {
            _service = service;
            _rabbitmq = rabbitmq;
        }

        // GET: api/JobServiceBudget
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobServiceBudget>>> GetJobServiceBudgets()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/JobServiceBudget/ByJob/5
        [HttpGet("ByJob/{jobMainId}")]
        public async Task<ActionResult<IEnumerable<JobServiceBudget>>> GetJobServiceBudgetsByJob(int jobMainId)
        {
            return await _service.GetByJobMainIdAsync(jobMainId);
        }

        // GET: api/JobServiceBudget/ByJob/5
        [HttpGet("ByJobIdWithBudgetForecast/{jobMainId}")]
        public async Task<ActionResult<IEnumerable<JobServiceBudgetListDto>>> ByJobIdWithBudgetForecast(int jobMainId)
        {
            return await _service.GetByJobMainIdWithBudgetForecastAsync(jobMainId);
        }

        // GET: api/JobServiceBudget/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobServiceBudget>> GetJobServiceBudget(int id)
        {
            var jobServiceBudget = await _service.GetByIdAsync(id);

            if (jobServiceBudget == null)
            {
                return NotFound();
            }

            return jobServiceBudget;
        }

        // GET: api/JobServiceBudget/ByGuid/{guid}
        [HttpGet("ByGuid/{recordGuid}")]
        public async Task<ActionResult<JobServiceBudget>> GetJobServiceBudgetByGuid(Guid recordGuid)
        {
            var jobServiceBudget = await _service.GetByRecordGuidAsync(recordGuid);

            if (jobServiceBudget == null)
            {
                return NotFound();
            }

            return jobServiceBudget;
        }

        // PUT: api/JobServiceBudget/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobServiceBudget(int id, JobServiceBudget jobServiceBudget)
        {
            if (id != jobServiceBudget.Id)
            {
                return BadRequest();
            }

            try
            {
                await _service.UpdateAsync(jobServiceBudget);

                //Send Message to RabbitMQ
                if (_rabbitmq != null)
                {
                    _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobServiceBudget with ID {jobServiceBudget.Id} updated." });
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_service.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/JobServiceBudget
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JobServiceBudget>> PostJobServiceBudget(JobServiceBudget jobServiceBudget)
        {
            await _service.AddAsync(jobServiceBudget);

            //Send Message to RabbitMQ
            if (_rabbitmq != null)
            {
                _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobServiceBudget with ID {jobServiceBudget.Id} created." });
            }

            return CreatedAtAction(nameof(GetJobServiceBudget), new { id = jobServiceBudget.Id }, jobServiceBudget);
        }

        // DELETE: api/JobServiceBudget/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobServiceBudget(int id)
        {
            var jobServiceBudget = await _service.GetByIdAsync(id);
            if (jobServiceBudget == null)
            {
                return NotFound();
            }

            await _service.DeleteAsync(jobServiceBudget);

            //Send Message to RabbitMQ
            if (_rabbitmq != null)
            {
                _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobServiceBudget with ID {id} deleted." });
            }

            return NoContent();
        }
    }
}
