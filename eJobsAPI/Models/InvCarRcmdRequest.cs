using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvCarRcmdRequest
{
    public int Id { get; set; }

    public int InvCarMntRcmdId { get; set; }

    public int InvCarRcmdStatusId { get; set; }

    public virtual InvCarMntRcmd InvCarMntRcmd { get; set; } = null!;

    public virtual InvCarRcmdStatus InvCarRcmdStatus { get; set; } = null!;
}
