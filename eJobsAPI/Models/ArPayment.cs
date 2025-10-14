using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArPayment
{
    public int Id { get; set; }

    public DateTime DtPayment { get; set; }

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public string? Reference { get; set; }

    public int ArAccountId { get; set; }

    public int ArPaymentTypeId { get; set; }

    public bool? IsDeposited { get; set; }

    public DateTime? DtDeposit { get; set; }

    public virtual ArAccount ArAccount { get; set; } = null!;

    public virtual ArPaymentType ArPaymentType { get; set; } = null!;

    public virtual ICollection<ArTransPayment> ArTransPayments { get; set; } = new List<ArTransPayment>();
}
