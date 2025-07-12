using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AccntMain
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public int AccntCategoryId { get; set; }

    public int AccntTypeId { get; set; }

    public virtual AccntCategory AccntCategory { get; set; } = null!;

    public virtual ICollection<AccntLedger> AccntLedgers { get; set; } = new List<AccntLedger>();

    public virtual AccntType AccntType { get; set; } = null!;
}
