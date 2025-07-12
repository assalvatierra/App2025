using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransPost
{
    public int Id { get; set; }

    public DateTime DtPost { get; set; }

    public decimal Amount { get; set; }

    public decimal Balance { get; set; }

    public decimal Cash { get; set; }

    public virtual ICollection<ApCashFlowPostGroup> ApCashFlowPostGroups { get; set; } = new List<ApCashFlowPostGroup>();
}
