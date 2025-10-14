using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Supplier
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Contact1 { get; set; }

    public string? Contact2 { get; set; }

    public string? Contact3 { get; set; }

    public string? Email { get; set; }

    public string? Details { get; set; }

    public int CityId { get; set; }

    public int SupplierTypeId { get; set; }

    public string? Status { get; set; }

    public string? Website { get; set; }

    public string? Address { get; set; }

    public int CountryId { get; set; }

    public string? Code { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual Country Country { get; set; } = null!;

    public virtual ICollection<JobService> JobServices { get; set; } = new List<JobService>();

    public virtual ICollection<SupplierActivity> SupplierActivities { get; set; } = new List<SupplierActivity>();

    public virtual ICollection<SupplierContact> SupplierContacts { get; set; } = new List<SupplierContact>();

    public virtual ICollection<SupplierDocument> SupplierDocuments { get; set; } = new List<SupplierDocument>();

    public virtual ICollection<SupplierInvItem> SupplierInvItems { get; set; } = new List<SupplierInvItem>();

    public virtual ICollection<SupplierItem> SupplierItems { get; set; } = new List<SupplierItem>();

    public virtual SupplierType SupplierType { get; set; } = null!;
}
