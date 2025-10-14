using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierPoDtl
{
    public int Id { get; set; }

    public int SupplierPoHdrId { get; set; }

    public string? Remarks { get; set; }

    public decimal Amount { get; set; }

    public int JobServicesId { get; set; }
}
