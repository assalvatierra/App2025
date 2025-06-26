using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Agent
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Roles { get; set; }

    public virtual ICollection<AgentBin> AgentBins { get; set; } = new List<AgentBin>();

    public virtual ICollection<AgentInstruction> AgentInstructions { get; set; } = new List<AgentInstruction>();
}
