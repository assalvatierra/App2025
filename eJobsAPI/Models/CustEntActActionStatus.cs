using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntActActionStatus
{
    public int Id { get; set; }

    public string ActionStatus { get; set; } = null!;

    public virtual ICollection<CustEntActivity> CustEntActivities { get; set; } = new List<CustEntActivity>();
}
