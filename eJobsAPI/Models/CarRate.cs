using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarRate
{
    public int Id { get; set; }

    public decimal Daily { get; set; }

    public decimal Weekly { get; set; }

    public decimal Monthly { get; set; }

    public int KmFree { get; set; }

    public int KmRate { get; set; }

    public int CarUnitId { get; set; }

    public decimal OtRate { get; set; }

    public virtual CarUnit CarUnit { get; set; } = null!;
}
