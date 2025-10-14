using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpArea
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? PageRemarks { get; set; }

    public string? PageView { get; set; }

    public string? PgFeatureImg { get; set; }

    public int Sort { get; set; }

    public virtual ICollection<TpProduct> TpProducts { get; set; } = new List<TpProduct>();
}
