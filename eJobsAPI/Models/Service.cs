using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Service
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<JobService> JobServices { get; set; } = new List<JobService>();

    public virtual ICollection<SrvActionItem> SrvActionItems { get; set; } = new List<SrvActionItem>();
}
