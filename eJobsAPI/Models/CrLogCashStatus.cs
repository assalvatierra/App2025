using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogCashStatus
{
    public int Id { get; set; }

    public DateTime DtStatus { get; set; }

    public int CrLogCashReleaseId { get; set; }

    public int CrCashReqStatusId { get; set; }

    public virtual CrCashReqStatus CrCashReqStatus { get; set; } = null!;

    public virtual CrLogCashRelease CrLogCashRelease { get; set; } = null!;
}
