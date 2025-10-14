using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesLeadItem
{
    public int Id { get; set; }

    public decimal? QuotedPrice { get; set; }

    public string? Remarks { get; set; }

    public int SalesLeadId { get; set; }

    public int InvItemId { get; set; }

    public virtual InvItem InvItem { get; set; } = null!;

    public virtual SalesLead SalesLead { get; set; } = null!;

    public virtual ICollection<SalesLeadQuotedItem> SalesLeadQuotedItems { get; set; } = new List<SalesLeadQuotedItem>();
}
