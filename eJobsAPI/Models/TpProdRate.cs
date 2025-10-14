using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpProdRate
{
    public int Id { get; set; }

    public int TpProductsId { get; set; }

    public int TpUomId { get; set; }

    public int GroupOf { get; set; }

    public decimal Rate { get; set; }

    public string? Remarks { get; set; }

    public int Sort { get; set; }

    public virtual TpProduct TpProducts { get; set; } = null!;

    public virtual TpUom TpUom { get; set; } = null!;
}
