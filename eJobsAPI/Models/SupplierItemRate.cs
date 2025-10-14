using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierItemRate
{
    public int Id { get; set; }

    public int SupplierInvItemId { get; set; }

    public string ItemRate { get; set; } = null!;

    public int SupplierUnitId { get; set; }

    public string? Remarks { get; set; }

    public string DtValidFrom { get; set; } = null!;

    public string DtValidTo { get; set; } = null!;

    public string? Particulars { get; set; }

    public string? By { get; set; }

    public string? Material { get; set; }

    public string? ProcBy { get; set; }

    public string? TradeTerm { get; set; }

    public string? Tolerance { get; set; }

    public string? DtEntered { get; set; }

    public string? Origin { get; set; }

    public virtual ICollection<SalesLeadQuotedItem> SalesLeadQuotedItems { get; set; } = new List<SalesLeadQuotedItem>();

    public virtual SupplierInvItem SupplierInvItem { get; set; } = null!;

    public virtual SupplierUnit SupplierUnit { get; set; } = null!;
}
