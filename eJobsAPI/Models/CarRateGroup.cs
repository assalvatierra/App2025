using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarRateGroup
{
    public int Id { get; set; }

    public int RateGroupId { get; set; }

    public int CarRatePackageId { get; set; }

    public virtual CarRatePackage CarRatePackage { get; set; } = null!;

    public virtual RateGroup RateGroup { get; set; } = null!;
}
