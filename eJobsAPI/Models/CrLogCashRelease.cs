using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogCashRelease
{
    public int Id { get; set; }

    public DateTime DtRelease { get; set; }

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public int CrLogDriverId { get; set; }

    public int? CrLogClosingId { get; set; }

    public int CrLogCashTypeId { get; set; }

    public virtual ICollection<CrLogCashGroup> CrLogCashGroups { get; set; } = new List<CrLogCashGroup>();

    public virtual ICollection<CrLogCashStatus> CrLogCashStatuses { get; set; } = new List<CrLogCashStatus>();

    public virtual CrLogCashType CrLogCashType { get; set; } = null!;

    public virtual CrLogClosing? CrLogClosing { get; set; }

    public virtual CrLogDriver CrLogDriver { get; set; } = null!;
}
