using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AccntLedger
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public int AccntMainId { get; set; }

    public virtual AccntMain AccntMain { get; set; } = null!;

    public virtual ICollection<AccntTrxDtl> AccntTrxDtls { get; set; } = new List<AccntTrxDtl>();
}
