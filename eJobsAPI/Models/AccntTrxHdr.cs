using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AccntTrxHdr
{
    public int Id { get; set; }

    public int AccntTrxTypeId { get; set; }

    public DateTime DtTrx { get; set; }

    public string? Remarks { get; set; }

    public virtual ICollection<AccntTrxDtl> AccntTrxDtls { get; set; } = new List<AccntTrxDtl>();

    public virtual AccntTrxType AccntTrxType { get; set; } = null!;
}
