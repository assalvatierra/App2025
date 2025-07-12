using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarReservation
{
    public int Id { get; set; }

    public DateTime DtTrx { get; set; }

    public int CarUnitId { get; set; }

    public string DtStart { get; set; } = null!;

    public string? LocStart { get; set; }

    public string DtEnd { get; set; } = null!;

    public string? LocEnd { get; set; }

    public string BaseRate { get; set; } = null!;

    public string Destinations { get; set; } = null!;

    public string UseFor { get; set; } = null!;

    public string RenterName { get; set; } = null!;

    public string? RenterCompany { get; set; }

    public string RenterEmail { get; set; } = null!;

    public string RenterMobile { get; set; } = null!;

    public string? RenterAddress { get; set; }

    public string? RenterFbAccnt { get; set; }

    public string? RenterLinkedInAccnt { get; set; }

    public int? EstHrPerDay { get; set; }

    public int? EstKmTravel { get; set; }

    public int? JobRefNo { get; set; }

    public int? SelfDrive { get; set; }

    public int CarResTypeId { get; set; }

    public string? NoDays { get; set; }

    public virtual ICollection<CarResPackage> CarResPackages { get; set; } = new List<CarResPackage>();

    public virtual CarResType CarResType { get; set; } = null!;

    public virtual CarUnit CarUnit { get; set; } = null!;
}
