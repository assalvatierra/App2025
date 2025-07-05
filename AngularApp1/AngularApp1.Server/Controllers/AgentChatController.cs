using AngularApp1.Server.Data;
using AngularApp1.Server.Services;
using Erp.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Services;

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

        public AgentChatController(ErpDbContext context)
        {
            _context = context;
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
            //_context.RefCountry.Add(refCountry);
            //await _context.SaveChangesAsync();

            var test = await _context.Agent.FindAsync(1);

            AgentBasic Agent = new AgentBasic();
            var result = await Agent.processInstructions(info.messageRequest, info.messageHistory);
            info.messageReply = result.Value ?? string.Empty;

            return CreatedAtAction("Process", new { id = info.AgentId }, info);
        }


    }
}