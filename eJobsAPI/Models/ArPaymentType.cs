using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArPaymentType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<ArPayment> ArPayments { get; set; } = new List<ArPayment>();
}
