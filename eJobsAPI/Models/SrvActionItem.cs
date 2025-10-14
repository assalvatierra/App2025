using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SrvActionItem
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public string? Remarks { get; set; }

    public int SortNo { get; set; }

    public int ServicesId { get; set; }

    public int SrvActionCodeId { get; set; }

    public virtual ICollection<JobAction> JobActions { get; set; } = new List<JobAction>();

    public virtual Service Services { get; set; } = null!;
}
