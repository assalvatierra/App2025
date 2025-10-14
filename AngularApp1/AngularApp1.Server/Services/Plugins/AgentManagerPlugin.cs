using AngularApp1.Server.Data;
using Erp.Domain.Models;
using Microsoft.SemanticKernel;
//using Microsoft.SemanticKernel.ChatCompletion;
//using Microsoft.SemanticKernel.Connectors.OpenAI;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

//using System.Linq;

namespace AngularApp1.Server.Services.Plugins
{
    public class AgentManagerPlugin
    {
        private readonly ErpDbContext _context;
        private readonly int _agentId;

        public AgentManagerPlugin(ErpDbContext context, int agentid)
        {
            _context = context;
            _agentId = agentid;
        }

        [KernelFunction("get_AvailableAgents")]
        [Description("Gets available agents. Instructions are the things the agent can do and permitted to do.")]
        public string GetAvailableAgent()
        {
            List<Agent> agents = _context.Agent
                .Where(d => d.Id != _agentId)
                .Include(a => a.AgentInstructions)
                .ToList<Agent>();

            string StaffAgents = "Agents List \n";
            foreach (var agent in agents)
            {
                if (agent.Roles != null && !agent.Roles.Contains("MANAGER"))
                {
                    string agentInstructions = string.Join(", ", agent.AgentInstructions
                        .Where(d=>d.Title.Contains("Instructions"))
                        .Select(i => i.Content)
                        .ToList()
                        );

                    StaffAgents += $"Id:{agent.Id},Name:{agent.Name},Description:{agent.Description}, Roles:{agent.Roles}, Instructions:{agentInstructions} \n";
                }
            }

            return StaffAgents;
        }

        [KernelFunction("get_AgentProcessResult")]
        [Description("get chat completion result from another agent. Use agentId as agent identifier")]
        public async Task<string> processInstructions(int agentId, string userInput, string chatHistory)
        {
            var agentdata = _context.Agent
                .Include(a => a.AgentInstructions)
                .Include(a => a.AgentFeatures)
                .FirstOrDefault(a => a.Id == agentId);

            string result = string.Empty;
            if (agentdata != null)
            {
                AgentBasic Agent = new AgentBasic(agentdata, _context);
                var response = await Agent.processInstructions(userInput, chatHistory);
                result = response.Value ?? string.Empty;
            }
            return result;
        }



    }
}
