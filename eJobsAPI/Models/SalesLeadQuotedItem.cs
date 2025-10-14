using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesLeadQuotedItem
{
    public int Id { get; set; }

    public int SalesLeadItemsId { get; set; }

    public int SupplierItemRateId { get; set; }

    public int SalesLeadQuotedItemStatusId { get; set; }

    public virtual SalesLeadItem SalesLeadItems { get; set; } = null!;

    public virtual SupplierItemRate SupplierItemRate { get; set; } = null!;
}
