using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesActCode
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Desc { get; set; } = null!;

    public string? SysCode { get; set; }

    public string? IconPath { get; set; }

    public int? DefaultActStatus { get; set; }

    public virtual ICollection<SalesActivity> SalesActivities { get; set; } = new List<SalesActivity>();
}
