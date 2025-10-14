using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApPayment
{
    public int Id { get; set; }

    public DateTime DtPayment { get; set; }

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public int ApAccountId { get; set; }

    public int ApPaymentTypeId { get; set; }

    public int ApPaymentStatusId { get; set; }

    public virtual ApAccount ApAccount { get; set; } = null!;

    public virtual ApPaymentStatus ApPaymentStatus { get; set; } = null!;

    public virtual ApPaymentType ApPaymentType { get; set; } = null!;

    public virtual ICollection<ApTransPayment> ApTransPayments { get; set; } = new List<ApTransPayment>();
}
