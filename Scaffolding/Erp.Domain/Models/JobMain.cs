using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobMain
{
    public int Id { get; set; }

    public DateTime JobDate { get; set; }

    public string Description { get; set; } = null!;

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public int? ItemStatusId { get; set; }

    public int? BusinessUnitId { get; set; }

    public virtual BusinessUnit? BusinessUnit { get; set; }

    public virtual ItemStatus? ItemStatus { get; set; }

    public virtual ICollection<JobContact> JobContacts { get; set; } = new List<JobContact>();

    public virtual ICollection<JobCustomer> JobCustomers { get; set; } = new List<JobCustomer>();

    public virtual ICollection<JobInventory> JobInventories { get; set; } = new List<JobInventory>();

    public virtual ICollection<JobService> JobServices { get; set; } = new List<JobService>();
}
