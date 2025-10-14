using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CoopMember
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Contact1 { get; set; }

    public string? Contact2 { get; set; }

    public string? Contact3 { get; set; }

    public string? Email { get; set; }

    public string? Details { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<CoopMemberItem> CoopMemberItems { get; set; } = new List<CoopMemberItem>();
}
