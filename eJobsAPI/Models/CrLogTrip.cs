using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogTrip
{
    public int Id { get; set; }

    public int CrLogDriverId { get; set; }

    public int CrLogUnitId { get; set; }

    public int CrLogCompanyId { get; set; }

    public DateTime DtTrip { get; set; }

    public decimal Rate { get; set; }

    public decimal Expenses { get; set; }

    public decimal DriverFee { get; set; }

    public string? Remarks { get; set; }

    public int? CrLogClosingId { get; set; }

    public decimal Addon { get; set; }

    public int? OdoStart { get; set; }

    public int? OdoEnd { get; set; }

    public decimal DriverOt { get; set; }

    public string? StartTime { get; set; }

    public string? EndTime { get; set; }

    public int? TripHours { get; set; }

    public decimal? Otrate { get; set; }

    public decimal? DriverOtrate { get; set; }

    public decimal? AddonOt { get; set; }

    public bool IsFinal { get; set; }

    public bool AllowEdit { get; set; }

    public bool? TripTicket { get; set; }

    public bool? IncludeOt { get; set; }

    public virtual CrLogClosing? CrLogClosing { get; set; }

    public virtual CrLogCompany CrLogCompany { get; set; } = null!;

    public virtual CrLogDriver CrLogDriver { get; set; } = null!;

    public virtual ICollection<CrLogPassenger> CrLogPassengers { get; set; } = new List<CrLogPassenger>();

    public virtual ICollection<CrLogTripJobMain> CrLogTripJobMains { get; set; } = new List<CrLogTripJobMain>();

    public virtual CrLogUnit CrLogUnit { get; set; } = null!;
}
