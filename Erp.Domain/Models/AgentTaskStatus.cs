using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class AgentTaskStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int Active { get; set; }

    public virtual ICollection<AgentTask> AgentTasks { get; set; } = new List<AgentTask>();
}
