using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApPaymentStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<ApPayment> ApPayments { get; set; } = new List<ApPayment>();
}
