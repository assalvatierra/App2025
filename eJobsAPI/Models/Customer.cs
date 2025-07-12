using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Customer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Email { get; set; }

    public string? Contact1 { get; set; }

    public string? Contact2 { get; set; }

    public string? Remarks { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<CustCat> CustCats { get; set; } = new List<CustCat>();

    public virtual ICollection<CustEntity> CustEntities { get; set; } = new List<CustEntity>();

    public virtual ICollection<CustNotifRecipient> CustNotifRecipients { get; set; } = new List<CustNotifRecipient>();

    public virtual ICollection<CustSalesCategory> CustSalesCategories { get; set; } = new List<CustSalesCategory>();

    public virtual ICollection<CustSocialAcc> CustSocialAccs { get; set; } = new List<CustSocialAcc>();

    public virtual ICollection<JobMain> JobMains { get; set; } = new List<JobMain>();

    public virtual ICollection<SalesLead> SalesLeads { get; set; } = new List<SalesLead>();

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
