using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierType
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<Supplier> Suppliers { get; set; } = new List<Supplier>();
}
