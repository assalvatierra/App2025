using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarUnitMeta
{
    public int Id { get; set; }

    public int CarUnitId { get; set; }

    public string PageTitle { get; set; } = null!;

    public string MetaDesc { get; set; } = null!;

    public string? HomeDesc { get; set; }

    public virtual CarUnit CarUnit { get; set; } = null!;
}
