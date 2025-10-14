using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SysAccessUser
{
    public int Id { get; set; }

    public string UserId { get; set; } = null!;

    public int SysMenuId { get; set; }

    public int Seqno { get; set; }

    public int SecKey { get; set; }

    public virtual SysMenu SysMenu { get; set; } = null!;
}
