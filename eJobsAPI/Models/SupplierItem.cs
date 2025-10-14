using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierItem
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public string? Remarks { get; set; }

    public int SupplierId { get; set; }

    public string? InCharge { get; set; }

    public string? Tel1 { get; set; }

    public string? Tel2 { get; set; }

    public string? Tel3 { get; set; }

    public string? Status { get; set; }

    public int? Interval { get; set; }

    public virtual ICollection<JobService> JobServices { get; set; } = new List<JobService>();

    public virtual Supplier Supplier { get; set; } = null!;
}
