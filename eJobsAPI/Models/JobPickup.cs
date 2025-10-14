using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobPickup
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public DateTime PuDate { get; set; }

    public string PuTime { get; set; } = null!;

    public string PuLocation { get; set; } = null!;

    public string ContactName { get; set; } = null!;

    public string ContactNumber { get; set; } = null!;

    public virtual JobMain JobMain { get; set; } = null!;
}
