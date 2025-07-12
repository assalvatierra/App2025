using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvCarMntRcmd
{
    public int Id { get; set; }

    public string Recommendation { get; set; } = null!;

    public DateTime DateRec { get; set; }

    public bool IsDone { get; set; }

    public int InvItemId { get; set; }

    public int InvCarMntPriorityId { get; set; }

    public DateTime? DateDue { get; set; }

    public string? Remarks { get; set; }

    public virtual InvCarMntPriority InvCarMntPriority { get; set; } = null!;

    public virtual ICollection<InvCarRcmdRequest> InvCarRcmdRequests { get; set; } = new List<InvCarRcmdRequest>();
}
