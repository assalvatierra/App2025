using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApPaymentType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<ApPayment> ApPayments { get; set; } = new List<ApPayment>();
}
