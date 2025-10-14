using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmSupplier
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<SmProdSupplier> SmProdSuppliers { get; set; } = new List<SmProdSupplier>();

    public virtual ICollection<SmSupplierInfo> SmSupplierInfos { get; set; } = new List<SmSupplierInfo>();
}
