using Microsoft.SemanticKernel;
using System.ComponentModel;
using Erp.Domain.Models;
using AngularApp1.Server.Data;
//using Microsoft.Extensions.DependencyInjection;
using System.Globalization;

namespace AngularApp1.Server.Services.Plugins
{
    public class AgentBinPlugin
    {
        private readonly ErpDbContext _context;
        private readonly int _agentId;

        public AgentBinPlugin(ErpDbContext context, int agentid)
        {
            _context = context;
            _agentId = agentid;
        }

        [KernelFunction("get_agentbins")]
        [Description("agents database feature. " + 
            "Gets all agents tasks, reminders, notes and info from agents database. One record per item"
            )]
        public string GetAgentBins()
        {
            string reminders = "Reminder List \n";
            List<AgentBin> agentBins = _context.AgentBin
                .Where(d => d.AgentId == _agentId)
                .ToList<AgentBin>();

            foreach (var bin in agentBins)
            {
                if (bin.Data != null && bin.Data.Length > 0)
                {
                    reminders += $"Id:{bin.Id}, Data:{bin.Data}, Status:{bin.Status} \n";
                }
            }

            return reminders;
        }

        [KernelFunction("add_agentbins")]
        [Description("agents database feature. " +
            "Save tasks, notes, reminders or infos in agent database. One record per item. "+
            "Types of tasks accepted: (1) General office tasks (2) Vehicle registration renewal tasks. "
            )]
        public string AddNewBin(string Data)
        {
            string binSaved = "Unable to save";
            if (Data != null && Data.Length > 0)
            {
                // Get the current max orderNo for this agent
                int nextOrderNo = 1;
                try
                {
                    var maxOrderNo = _context.AgentBin
                        .Where(b => b.AgentId == _agentId && b.OrderNo.HasValue)
                        .Select(b => b.OrderNo.Value)
                        .DefaultIfEmpty(0)
                        .Max();
                    nextOrderNo = maxOrderNo + 1;
                }
                catch (Exception ex)
                {
                    //Console.WriteLine($"Error getting max orderNo: {ex.Message}");
                    nextOrderNo = 1;
                }


                AgentBin bin = new AgentBin
                {
                    AgentId = _agentId,
                    Data = Data,
                    DtAdded = DateTime.Now,
                    OrderNo = nextOrderNo
                };
                _context.AgentBin.Add(bin);
                _context.SaveChanges();
                binSaved = "Bin saved successfully";
            }
            return binSaved;
        }

        [KernelFunction("update_agentbins")]
        [Description("Update tasks, notes, reminders, info")]
        public string UpdateBin(int binId, string Data)
        {
            string binUpdated = "Unable to update";
            if (Data != null && Data.Length > 0)
            {
                var bin = _context.AgentBin.FirstOrDefault(b => b.Id == binId && b.AgentId == _agentId);
                if (bin != null)
                {
                    bin.Data = Data;
                    _context.SaveChanges();
                    binUpdated = "Bin updated successfully";
                }
            }
            return binUpdated;
        }

        [KernelFunction("update_agentbinStatus")]
        [Description("Update Status for tasks, notes, reminders, info")]
        public string UpdateStatusBin(int binId, string Status)
        {
            string binUpdated = "Unable to update";
            if (Status != null && Status.Length > 0)
            {
                var bin = _context.AgentBin.FirstOrDefault(b => b.Id == binId && b.AgentId == _agentId);
                if (bin != null)
                {
                    bin.Status = Status;
                    _context.SaveChanges();
                    binUpdated = "Bin updated successfully";
                }
            }
            return binUpdated;
        }

    }
}
