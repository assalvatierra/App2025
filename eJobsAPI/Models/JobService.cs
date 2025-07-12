using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobService
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public int ServicesId { get; set; }

    public int SupplierId { get; set; }

    public string? Particulars { get; set; }

    public decimal? QuotedAmt { get; set; }

    public decimal? SupplierAmt { get; set; }

    public decimal? ActualAmt { get; set; }

    public string? Remarks { get; set; }

    public int SupplierItemId { get; set; }

    public DateTime? DtStart { get; set; }

    public DateTime? DtEnd { get; set; }

    public virtual ICollection<JobAction> JobActions { get; set; } = new List<JobAction>();

    public virtual ICollection<JobExpense> JobExpenses { get; set; } = new List<JobExpense>();

    public virtual JobMain JobMain { get; set; } = null!;

    public virtual ICollection<JobPostSale> JobPostSales { get; set; } = new List<JobPostSale>();

    public virtual ICollection<JobServiceItem> JobServiceItems { get; set; } = new List<JobServiceItem>();

    public virtual ICollection<JobServicePickup> JobServicePickups { get; set; } = new List<JobServicePickup>();

    public virtual Service Services { get; set; } = null!;

    public virtual Supplier Supplier { get; set; } = null!;

    public virtual SupplierItem SupplierItem { get; set; } = null!;
}
