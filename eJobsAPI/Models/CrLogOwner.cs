using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogOwner
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Mobile { get; set; }

    public string? Remarks { get; set; }

    public virtual ICollection<CrLogUnit> CrLogUnits { get; set; } = new List<CrLogUnit>();
}
