using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogDriverPayment
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public int CrLogDriverId { get; set; }
}
