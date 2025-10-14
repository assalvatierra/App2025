using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrCashReqStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<CrLogCashStatus> CrLogCashStatuses { get; set; } = new List<CrLogCashStatus>();

    public virtual ICollection<CrLogFuelStatus> CrLogFuelStatuses { get; set; } = new List<CrLogFuelStatus>();
}
