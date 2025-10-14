using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApCashFlow
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public decimal Amount { get; set; }

    public DateTime Date { get; set; }

    public string? Remarks { get; set; }

    public int ApCashFlowTypeId { get; set; }

    public int ApAccountId { get; set; }

    public string PerformedBy { get; set; } = null!;

    public virtual ApAccount ApAccount { get; set; } = null!;

    public virtual ICollection<ApCashFlowPostGroup> ApCashFlowPostGroups { get; set; } = new List<ApCashFlowPostGroup>();

    public virtual ApCashFlowType ApCashFlowType { get; set; } = null!;
}
