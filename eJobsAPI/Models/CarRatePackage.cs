using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarRatePackage
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public string? Remarks { get; set; }

    public decimal DailyMeals { get; set; }

    public decimal DailyRoom { get; set; }

    public int DaysMin { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<CarRateGroup> CarRateGroups { get; set; } = new List<CarRateGroup>();

    public virtual ICollection<CarRateUnitPackage> CarRateUnitPackages { get; set; } = new List<CarRateUnitPackage>();
}
