using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierUnit
{
    public int Id { get; set; }

    public string Unit { get; set; } = null!;

    public virtual ICollection<SupplierItemRate> SupplierItemRates { get; set; } = new List<SupplierItemRate>();
}
