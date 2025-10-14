using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<JobMain> JobMains { get; set; } = new List<JobMain>();
}
