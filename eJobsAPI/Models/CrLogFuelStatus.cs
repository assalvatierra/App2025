using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogFuelStatus
{
    public int Id { get; set; }

    public DateTime DtStatus { get; set; }

    public int CrLogFuelId { get; set; }

    public int CrCashReqStatusId { get; set; }

    public virtual CrCashReqStatus CrCashReqStatus { get; set; } = null!;

    public virtual CrLogFuel CrLogFuel { get; set; } = null!;
}
