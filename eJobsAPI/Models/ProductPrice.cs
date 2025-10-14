using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ProductPrice
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string Uom { get; set; } = null!;

    public int Qty { get; set; }

    public decimal Rate { get; set; }

    public decimal Rate1 { get; set; }

    public virtual Product Product { get; set; } = null!;
}
