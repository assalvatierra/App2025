using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AccntTrxDtl
{
    public int Id { get; set; }

    public int AccntTrxHdrId { get; set; }

    public string? Remarks { get; set; }

    public decimal DbAmt { get; set; }

    public decimal CrAmt { get; set; }

    public int AccntLedgerId { get; set; }

    public virtual AccntLedger AccntLedger { get; set; } = null!;

    public virtual AccntTrxHdr AccntTrxHdr { get; set; } = null!;
}
