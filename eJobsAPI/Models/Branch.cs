using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Branch
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int CityId { get; set; }

    public string? Remarks { get; set; }

    public string? Address { get; set; }

    public string? Landline { get; set; }

    public string? Mobile { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual ICollection<JobMain> JobMains { get; set; } = new List<JobMain>();
}
