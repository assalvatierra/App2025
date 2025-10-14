using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmBranch
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<SmProduct> SmProducts { get; set; } = new List<SmProduct>();
}
