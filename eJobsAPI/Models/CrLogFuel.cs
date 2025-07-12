using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogFuel
{
    public int Id { get; set; }

    public DateTime DtRequest { get; set; }

    public decimal Amount { get; set; }

    public int CrLogUnitId { get; set; }

    public int CrLogDriverId { get; set; }

    public DateTime DtFillup { get; set; }

    public int OdoFillup { get; set; }

    public decimal OrAmount { get; set; }

    public int CrLogTypeId { get; set; }

    public int? OdoStart { get; set; }

    public int? OdoEnd { get; set; }

    public bool IsFullTank { get; set; }

    public int CrLogPaymentTypeId { get; set; }

    public string? Remarks { get; set; }

    public virtual CrLogDriver CrLogDriver { get; set; } = null!;

    public virtual ICollection<CrLogFuelStatus> CrLogFuelStatuses { get; set; } = new List<CrLogFuelStatus>();

    public virtual CrLogPaymentType CrLogPaymentType { get; set; } = null!;

    public virtual CrLogType CrLogType { get; set; } = null!;

    public virtual CrLogUnit CrLogUnit { get; set; } = null!;
}
