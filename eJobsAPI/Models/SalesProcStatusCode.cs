using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesProcStatusCode
{
    public int Id { get; set; }

    public string? SeqNo { get; set; }

    public string Name { get; set; } = null!;

    public int? IconPath { get; set; }

    public virtual ICollection<SalesProcStatus> SalesProcStatuses { get; set; } = new List<SalesProcStatus>();
}
