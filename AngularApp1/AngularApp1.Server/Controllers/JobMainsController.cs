using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.DBServices;
using AngularApp1.Server.DTOs;
using Erp.Domain.Models;
using AngularApp1.Server.Services.RabbitMQ;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobMainsController : ControllerBase
    {
        private readonly IJobMainsService _service;
        private readonly IRabbitMqBasic? _rabbitmq;

        public JobMainsController(IJobMainsService service, IRabbitMqBasic? rabbitmq)
        {
            _service = service;
            _rabbitmq = rabbitmq;
        }

        // GET: api/JobMains
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobMain>>> GetJobMain()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/JobMains/List
        [HttpGet("List")]
        public async Task<ActionResult<IEnumerable<JobMainListDto>>> GetJobMainList()
        {
            return await _service.GetListAsync();
        }

        // GET: api/JobMains/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobMain>> GetJobMain(int id)
        {
            var jobMain = await _service.GetByIdAsync(id);

            if (jobMain == null)
            {
                return NotFound();
            }

            return jobMain;
        }

        // PUT
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobMain(int id, JobMain jobMain)
        {
            if (id != jobMain.Id)
            {
                return BadRequest();
            }

            try
            {
                await _service.UpdateAsync(jobMain);

                //Send Message to RabbitMQ
                if (_rabbitmq != null)
                {
                    _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobMain with ID {jobMain.Id} updated." });
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

        // POST: api/JobMains
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<JobMain>> PostJobMain(JobMain jobMain)
        {
            await _service.AddAsync(jobMain);

            //Send Message to RabbitMQ
            if (_rabbitmq != null)
            {
                _rabbitmq.Send(new RabbitMqMessageDto { Message = $"JobMain with ID {jobMain.Id} created." });
            }

            return CreatedAtAction("GetJobMain", new { id = jobMain.Id }, jobMain);
        }

        // DELETE: api/JobMains/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobMain(int id)
        {
            var jobMain = await _service.GetByIdAsync(id);
            if (jobMain == null)
            {
                return NotFound();
            }

            await _service.DeleteAsync(jobMain);

            return NoContent();
        }
    }
}
