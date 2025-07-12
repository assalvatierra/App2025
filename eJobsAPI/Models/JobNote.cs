using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobNote
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public int? Sort { get; set; }

    public string? Note { get; set; }

    public virtual JobMain JobMain { get; set; } = null!;
}
