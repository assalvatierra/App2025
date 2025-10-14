using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmSupplierInfo
{
    public int Id { get; set; }

    public int SmSupplierId { get; set; }

    public string Label { get; set; } = null!;

    public string? Value { get; set; }

    public string? Remarks { get; set; }

    public virtual SmSupplier SmSupplier { get; set; } = null!;
}
