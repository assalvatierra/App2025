using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarUnit
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public int CarCategoryId { get; set; }

    public int? SelfDrive { get; set; }

    public int? SortOrder { get; set; }

    public string? Status { get; set; }

    public virtual CarCategory CarCategory { get; set; } = null!;

    public virtual ICollection<CarDetail> CarDetails { get; set; } = new List<CarDetail>();

    public virtual ICollection<CarImage> CarImages { get; set; } = new List<CarImage>();

    public virtual ICollection<CarRateUnitPackage> CarRateUnitPackages { get; set; } = new List<CarRateUnitPackage>();

    public virtual ICollection<CarRate> CarRates { get; set; } = new List<CarRate>();

    public virtual ICollection<CarReservation> CarReservations { get; set; } = new List<CarReservation>();

    public virtual ICollection<CarUnitMeta> CarUnitMeta { get; set; } = new List<CarUnitMeta>();

    public virtual ICollection<CarViewPage> CarViewPages { get; set; } = new List<CarViewPage>();
}
