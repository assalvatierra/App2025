using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArActionItem
{
    public int Id { get; set; }

    public string Action { get; set; } = null!;

    public string? Remarks { get; set; }

    public decimal SortNo { get; set; }

    public virtual ICollection<ArAction> ArActions { get; set; } = new List<ArAction>();
}
