using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogUnit
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public int? OrderNo { get; set; }

    public string? Status { get; set; }

    public int CrLogOwnerId { get; set; }

    public string? Remarks { get; set; }

    public virtual ICollection<CrLogFuel> CrLogFuels { get; set; } = new List<CrLogFuel>();

    public virtual ICollection<CrLogOdo> CrLogOdos { get; set; } = new List<CrLogOdo>();

    public virtual CrLogOwner CrLogOwner { get; set; } = null!;

    public virtual ICollection<CrLogTrip> CrLogTrips { get; set; } = new List<CrLogTrip>();

    public virtual ICollection<CrRptUnit> CrRptUnits { get; set; } = new List<CrRptUnit>();
}
