using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogClosing
{
    public int Id { get; set; }

    public DateTime DtClose { get; set; }

    public virtual ICollection<CrLogCashRelease> CrLogCashReleases { get; set; } = new List<CrLogCashRelease>();

    public virtual ICollection<CrLogTrip> CrLogTrips { get; set; } = new List<CrLogTrip>();
}
