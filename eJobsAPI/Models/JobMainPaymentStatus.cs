using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobMainPaymentStatus
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public int JobPaymentStatusId { get; set; }

    public virtual JobPaymentStatus JobPaymentStatus { get; set; } = null!;
}
