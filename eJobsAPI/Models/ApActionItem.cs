using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApActionItem
{
    public int Id { get; set; }

    public string Action { get; set; } = null!;

    public string? Remarks { get; set; }

    public int SortNo { get; set; }

    public virtual ICollection<ApAction> ApActions { get; set; } = new List<ApAction>();
}
