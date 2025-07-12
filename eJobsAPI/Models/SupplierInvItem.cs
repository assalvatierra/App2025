using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierInvItem
{
    public int Id { get; set; }

    public int SupplierId { get; set; }

    public int InvItemId { get; set; }

    public virtual InvItem InvItem { get; set; } = null!;

    public virtual Supplier Supplier { get; set; } = null!;

    public virtual ICollection<SupplierItemRate> SupplierItemRates { get; set; } = new List<SupplierItemRate>();
}
