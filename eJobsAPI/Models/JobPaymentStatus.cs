using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobPaymentStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<JobMainPaymentStatus> JobMainPaymentStatuses { get; set; } = new List<JobMainPaymentStatus>();
}
