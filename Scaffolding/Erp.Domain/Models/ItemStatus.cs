using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ItemStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public string? Code { get; set; }

    public int? SortOrder { get; set; }

    public int? ItemStatusClassId { get; set; }

    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();

    public virtual ICollection<Entity> Entities { get; set; } = new List<Entity>();

    public virtual ItemStatusClass? ItemStatusClass { get; set; }

    public virtual ICollection<JobMain> JobMains { get; set; } = new List<JobMain>();

    public virtual ICollection<JobService> JobServices { get; set; } = new List<JobService>();

    public virtual ICollection<ServiceItem> ServiceItems { get; set; } = new List<ServiceItem>();
}
