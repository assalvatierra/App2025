using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogDriver
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Contact1 { get; set; }

    public string? Contact2 { get; set; }

    public int? OrderNo { get; set; }

    public string? Status { get; set; }

    public string? Remarks { get; set; }

    public virtual ICollection<CrLogCashRelease> CrLogCashReleases { get; set; } = new List<CrLogCashRelease>();

    public virtual ICollection<CrLogCashSalary> CrLogCashSalaries { get; set; } = new List<CrLogCashSalary>();

    public virtual ICollection<CrLogDriverTerm> CrLogDriverTerms { get; set; } = new List<CrLogDriverTerm>();

    public virtual ICollection<CrLogFuel> CrLogFuels { get; set; } = new List<CrLogFuel>();

    public virtual ICollection<CrLogOdo> CrLogOdos { get; set; } = new List<CrLogOdo>();

    public virtual ICollection<CrLogTrip> CrLogTrips { get; set; } = new List<CrLogTrip>();
}
