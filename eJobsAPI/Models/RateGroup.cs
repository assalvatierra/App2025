using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class RateGroup
{
    public int Id { get; set; }

    public string GroupName { get; set; } = null!;

    public virtual ICollection<CarRateGroup> CarRateGroups { get; set; } = new List<CarRateGroup>();
}
