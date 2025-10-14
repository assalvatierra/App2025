using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CoopMemberItem
{
    public int Id { get; set; }

    public int CoopMemberId { get; set; }

    public int InvItemId { get; set; }

    public virtual CoopMember CoopMember { get; set; } = null!;

    public virtual InvItem InvItem { get; set; } = null!;
}
