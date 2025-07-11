using AngularApp1.Server.Data;
using AngularApp1.Server.Services;
using Erp.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Services;
using Microsoft.Extensions.DependencyInjection;

namespace AngularApp1.Server.Controllers
{
    public class AgentInfo
    {
        public int AgentId { get; set; }
        public string Instructions { get; set; } = string.Empty;
        public string messageRequest { get; set; } = string.Empty;
        public string messageReply { get; set; } = string.Empty;
        public string messageHistory { get; set;} = string.Empty;

        public AgentInfo() { }
        public AgentInfo(int agentId, string agentInstructions)
        {
            this.AgentId = agentId;
            this.Instructions = agentInstructions;
        }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class AgentChatController : ControllerBase
    {
        private readonly ErpDbContext _context;
        private readonly IServiceProvider _serviceProvider;

        public AgentChatController(ErpDbContext context, IServiceProvider serviceProvider)
        {
            _context = context;
            _serviceProvider = serviceProvider;
        }


        // GET: api/AgentChat/5?message=hello
        [HttpGet("{id}")]
        public string Process(int id, [FromQuery] string message)
        {
            string result = "test";
            // You can use 'id' and 'message' variables here as needed

            return result;
        }


        [HttpPost]
        public async Task<ActionResult<AgentInfo>> Process(AgentInfo info)
        {
            var agentdata = await _context.Agent
                .Include(a => a.AgentInstructions)
                .Include(a => a.AgentFeatures)
                .FirstOrDefaultAsync(a=> a.Id == info.AgentId);

            if (agentdata == null)
            {
                return NotFound($"Agent with ID {info.AgentId} not found.");
            }

            AgentBasic Agent = new AgentBasic(agentdata, _context);
            var result = await Agent.processInstructions(info.messageRequest, info.messageHistory);
            info.messageReply = result.Value ?? string.Empty;

            return CreatedAtAction("Process", new { id = info.AgentId }, info);
        }


    }
}