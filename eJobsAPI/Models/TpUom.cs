using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpUom
{
    public int Id { get; set; }

    public string Measure { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<TpProdRate> TpProdRates { get; set; } = new List<TpProdRate>();
}
