using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarCategory
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public virtual ICollection<CarUnit> CarUnits { get; set; } = new List<CarUnit>();
}
