using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApCashFlowType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<ApCashFlow> ApCashFlows { get; set; } = new List<ApCashFlow>();
}
