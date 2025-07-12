using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogCompany
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Status { get; set; }

    public bool IsShuttle { get; set; }

    public bool IsInternal { get; set; }

    public string? BillingName { get; set; }

    public string? BillingAddress { get; set; }

    public string? BillingTin { get; set; }

    public string? BillingStyle { get; set; }

    public string? BillingRemarks { get; set; }

    public virtual ICollection<CrLogCompanyRate> CrLogCompanyRates { get; set; } = new List<CrLogCompanyRate>();

    public virtual ICollection<CrLogTrip> CrLogTrips { get; set; } = new List<CrLogTrip>();
}
