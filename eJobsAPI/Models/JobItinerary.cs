using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobItinerary
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public int DestinationId { get; set; }

    public decimal? ActualRate { get; set; }

    public string? Remarks { get; set; }

    public DateTime? ItiDate { get; set; }

    public int? SvcId { get; set; }

    public virtual Destination Destination { get; set; } = null!;

    public virtual JobMain JobMain { get; set; } = null!;
}
