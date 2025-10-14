using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Entity
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public string? Code { get; set; }

    public int? SortOrder { get; set; }

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

    public int? EntityTypeId { get; set; }

    public int? EntityStatusId { get; set; }

    public int? BusinessUnitId { get; set; }

    public int? RefCityId { get; set; }

    public virtual BusinessUnit? BusinessUnit { get; set; }

    public virtual ICollection<EntityContact> EntityContacts { get; set; } = new List<EntityContact>();

    public virtual ItemStatus? EntityStatus { get; set; }

    public virtual ItemType? EntityType { get; set; }

    public virtual ICollection<JobCustomer> JobCustomers { get; set; } = new List<JobCustomer>();

    public virtual ICollection<JobService> JobServices { get; set; } = new List<JobService>();

    public virtual RefCity? RefCity { get; set; }
}
