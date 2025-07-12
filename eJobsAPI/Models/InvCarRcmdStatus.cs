using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvCarRcmdStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<InvCarRcmdRequest> InvCarRcmdRequests { get; set; } = new List<InvCarRcmdRequest>();
}
