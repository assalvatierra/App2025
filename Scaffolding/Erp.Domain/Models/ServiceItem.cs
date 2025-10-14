using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ServiceItem
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public string? Code { get; set; }

    public int? SortOrder { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public int? ItemTypeId { get; set; }

    public int? ItemStatusId { get; set; }

    public virtual ItemStatus? ItemStatus { get; set; }

    public virtual ItemType? ItemType { get; set; }

    public virtual ICollection<JobService> JobServices { get; set; } = new List<JobService>();
}
