using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarDetail
{
    public int Id { get; set; }

    public string Fuel { get; set; } = null!;

    public string? Class { get; set; }

    public string? Transmission { get; set; }

    public string? Usage { get; set; }

    public string? Passengers { get; set; }

    public string? Remarks { get; set; }

    public int CarUnitId { get; set; }

    public virtual CarUnit CarUnit { get; set; } = null!;
}
