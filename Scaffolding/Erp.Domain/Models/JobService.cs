using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobService
{
    public int Id { get; set; }

    public int? JobMainId { get; set; }

    public string? Particulars { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public decimal? QuotedAmt { get; set; }

    public decimal? SupplierAmt { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public int? ServiceItemId { get; set; }

    public int? SupplierId { get; set; }

    public int? ItemStatusId { get; set; }

    public int SortOrder { get; set; }

    public virtual ItemStatus? ItemStatus { get; set; }

    public virtual JobMain? JobMain { get; set; }

    public virtual ICollection<JobServiceContact> JobServiceContacts { get; set; } = new List<JobServiceContact>();

    public virtual ServiceItem? ServiceItem { get; set; }

    public virtual Entity? Supplier { get; set; }
}
