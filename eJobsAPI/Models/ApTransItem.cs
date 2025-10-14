using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransItem
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public int ApTransactionId { get; set; }

    public virtual ApTransaction ApTransaction { get; set; } = null!;
}
