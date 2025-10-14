using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobPaymentType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<JobPayment> JobPayments { get; set; } = new List<JobPayment>();
}
