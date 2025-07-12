using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobThru
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public virtual ICollection<JobMain> JobMains { get; set; } = new List<JobMain>();
}
