using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArTransPayment
{
    public int Id { get; set; }

    public int ArTransactionId { get; set; }

    public int ArPaymentId { get; set; }

    public virtual ArPayment ArPayment { get; set; } = null!;

    public virtual ArTransaction ArTransaction { get; set; } = null!;
}
