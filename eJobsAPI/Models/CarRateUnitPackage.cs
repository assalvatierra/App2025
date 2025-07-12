using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarRateUnitPackage
{
    public int Id { get; set; }

    public int CarRatePackageId { get; set; }

    public int CarUnitId { get; set; }

    public decimal DailyRate { get; set; }

    public decimal FuelLonghaul { get; set; }

    public decimal FuelDaily { get; set; }

    public decimal? DailyAddon { get; set; }

    public string? Status { get; set; }

    public virtual CarRatePackage CarRatePackage { get; set; } = null!;

    public virtual ICollection<CarResPackage> CarResPackages { get; set; } = new List<CarResPackage>();

    public virtual CarUnit CarUnit { get; set; } = null!;
}
