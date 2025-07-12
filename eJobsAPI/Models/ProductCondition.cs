using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ProductCondition
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string Description { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual Product Product { get; set; } = null!;
}
