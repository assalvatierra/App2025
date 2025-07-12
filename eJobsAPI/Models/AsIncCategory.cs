using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AsIncCategory
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<AsSale> AsSales { get; set; } = new List<AsSale>();
}
