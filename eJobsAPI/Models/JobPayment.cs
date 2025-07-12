using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobPayment
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public DateTime DtPayment { get; set; }

    public decimal PaymentAmt { get; set; }

    public string? Remarks { get; set; }

    public int BankId { get; set; }

    public int JobPaymentTypeId { get; set; }

    public virtual Bank Bank { get; set; } = null!;

    public virtual JobMain JobMain { get; set; } = null!;

    public virtual JobPaymentType JobPaymentType { get; set; } = null!;
}
