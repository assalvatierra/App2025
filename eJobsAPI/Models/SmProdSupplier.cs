using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmProdSupplier
{
    public int Id { get; set; }

    public DateTime ValidStart { get; set; }

    public DateTime ValidEnd { get; set; }

    public decimal Price { get; set; }

    public decimal Contracted { get; set; }

    public int SmSupplierId { get; set; }

    public int SmProductId { get; set; }

    public virtual SmProduct SmProduct { get; set; } = null!;

    public virtual SmSupplier SmSupplier { get; set; } = null!;
}
