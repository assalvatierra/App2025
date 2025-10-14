using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransPayment
{
    public int Id { get; set; }

    public int ApPaymentsId { get; set; }

    public int ApTransactionId { get; set; }

    public virtual ApPayment ApPayments { get; set; } = null!;

    public virtual ApTransaction ApTransaction { get; set; } = null!;
}
