using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobType
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public int? Tticket { get; set; }

    public int? Ttransport { get; set; }

    public int? Ttour { get; set; }

    public int? Thotel { get; set; }

    public int? Tothers { get; set; }

    public string? Remarks { get; set; }

    public virtual JobMain JobMain { get; set; } = null!;
}
