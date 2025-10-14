using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmProdStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<SmProduct> SmProducts { get; set; } = new List<SmProduct>();
}
