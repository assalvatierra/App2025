using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmProdInfo
{
    public int Id { get; set; }

    public int SmProductId { get; set; }

    public string Label { get; set; } = null!;

    public string? Value { get; set; }

    public string? Remarks { get; set; }

    public virtual SmProduct SmProduct { get; set; } = null!;
}
