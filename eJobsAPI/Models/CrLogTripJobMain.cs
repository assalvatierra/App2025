using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogTripJobMain
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public int CrLogTripId { get; set; }

    public virtual CrLogTrip CrLogTrip { get; set; } = null!;
}
