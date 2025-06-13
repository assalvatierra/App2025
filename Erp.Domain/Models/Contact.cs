using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Contact
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public string? ContactNo1 { get; set; }

    public string? ContactNo2 { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public string? Email1 { get; set; }

    public string? Email2 { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public int? TypeId { get; set; }

    public int StatusId { get; set; }

    public int? RefCityId { get; set; }

    public virtual ICollection<EntityContact> EntityContacts { get; set; } = new List<EntityContact>();

    public virtual ICollection<JobContact> JobContacts { get; set; } = new List<JobContact>();

    public virtual ICollection<JobServiceContact> JobServiceContacts { get; set; } = new List<JobServiceContact>();

    public virtual RefCity? RefCity { get; set; }

    public virtual ItemStatus? Status { get; set; } = null!;

    public virtual ItemType? Type { get; set; }
}
