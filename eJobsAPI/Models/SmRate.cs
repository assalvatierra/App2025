using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmRate
{
    public int Id { get; set; }

    public int Qty { get; set; }

    public decimal Rate { get; set; }

    public decimal Drate { get; set; }

    public int SmProductId { get; set; }

    public int SmRateUoMid { get; set; }

    public virtual SmProduct SmProduct { get; set; } = null!;

    public virtual SmRateUoM SmRateUoM { get; set; } = null!;
}
