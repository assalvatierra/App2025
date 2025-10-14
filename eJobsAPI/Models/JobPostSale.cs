using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobPostSale
{
    public int Id { get; set; }

    public DateTime DtPost { get; set; }

    public string DoneBy { get; set; } = null!;

    public string? Remarks { get; set; }

    public int JobServicesId { get; set; }

    public virtual JobService JobServices { get; set; } = null!;
}
