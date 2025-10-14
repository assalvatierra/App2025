using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class PaypalTransaction
{
    public int Id { get; set; }

    public string TrxId { get; set; } = null!;

    public int JobId { get; set; }

    public DateTime TrxDate { get; set; }

    public DateTime DatePosted { get; set; }

    public string Status { get; set; } = null!;

    public string? Remarks { get; set; }

    public decimal Amount { get; set; }
}
