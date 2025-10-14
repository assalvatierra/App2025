using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AccntTrxType
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<AccntTrxHdr> AccntTrxHdrs { get; set; } = new List<AccntTrxHdr>();
}
