using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesActStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? IconPath { get; set; }

    public virtual ICollection<SalesActivity> SalesActivities { get; set; } = new List<SalesActivity>();
}
