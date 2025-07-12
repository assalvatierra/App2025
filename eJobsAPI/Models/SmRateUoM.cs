using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmRateUoM
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<SmRate> SmRates { get; set; } = new List<SmRate>();
}
