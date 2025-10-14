using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierActivity
{
    public int Id { get; set; }

    public string? ActivityType { get; set; }

    public string? Code { get; set; }

    public DateTime DtActivity { get; set; }

    public string? Assigned { get; set; }

    public string? Remarks { get; set; }

    public int SupplierId { get; set; }

    public decimal? Amount { get; set; }

    public string? Type { get; set; }

    public string? ProjName { get; set; }

    public int SupplierActStatusId { get; set; }

    public int SupplierActActionCodeId { get; set; }

    public int SupplierActActionStatusId { get; set; }

    public virtual ICollection<SalesLeadSupActivity> SalesLeadSupActivities { get; set; } = new List<SalesLeadSupActivity>();

    public virtual Supplier Supplier { get; set; } = null!;
}
