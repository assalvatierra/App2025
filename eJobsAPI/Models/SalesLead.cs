using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesLead
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public string Details { get; set; } = null!;

    public string? Remarks { get; set; }

    public int CustomerId { get; set; }

    public string? CustName { get; set; }

    public DateTime DtEntered { get; set; }

    public string EnteredBy { get; set; } = null!;

    public decimal Price { get; set; }

    public string? AssignedTo { get; set; }

    public string? CustPhone { get; set; }

    public string? CustEmail { get; set; }

    public string? SalesCode { get; set; }

    public string? ItemWeight { get; set; }

    public string? Commodity { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual ICollection<SalesActivity> SalesActivities { get; set; } = new List<SalesActivity>();

    public virtual ICollection<SalesLeadCategory> SalesLeadCategories { get; set; } = new List<SalesLeadCategory>();

    public virtual ICollection<SalesLeadFile> SalesLeadFiles { get; set; } = new List<SalesLeadFile>();

    public virtual ICollection<SalesLeadItem> SalesLeadItems { get; set; } = new List<SalesLeadItem>();

    public virtual ICollection<SalesLeadLink> SalesLeadLinks { get; set; } = new List<SalesLeadLink>();

    public virtual ICollection<SalesLeadSupActivity> SalesLeadSupActivities { get; set; } = new List<SalesLeadSupActivity>();

    public virtual ICollection<SalesProcStatus> SalesProcStatuses { get; set; } = new List<SalesProcStatus>();

    public virtual ICollection<SalesStatus> SalesStatuses { get; set; } = new List<SalesStatus>();
}
