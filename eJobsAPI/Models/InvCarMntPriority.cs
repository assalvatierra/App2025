using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvCarMntPriority
{
    public int Id { get; set; }

    public string Priority { get; set; } = null!;

    public int Order { get; set; }

    public string IconSrc { get; set; } = null!;

    public virtual ICollection<InvCarMntRcmd> InvCarMntRcmds { get; set; } = new List<InvCarMntRcmd>();
}
