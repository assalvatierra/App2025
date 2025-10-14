using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Destination
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public decimal? PubRate { get; set; }

    public decimal? ConRate { get; set; }

    public string? Remarks { get; set; }

    public int CityId { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual ICollection<JobItinerary> JobItineraries { get; set; } = new List<JobItinerary>();
}
