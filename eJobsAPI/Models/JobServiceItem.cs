using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobServiceItem
{
    public int Id { get; set; }

    public int JobServicesId { get; set; }

    public int InvItemId { get; set; }

    public virtual InvItem InvItem { get; set; } = null!;

    public virtual JobService JobServices { get; set; } = null!;
}
