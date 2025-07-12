using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SysServiceMenu
{
    public int Id { get; set; }

    public int SysMenuId { get; set; }

    public int SysServiceId { get; set; }

    public virtual SysMenu SysMenu { get; set; } = null!;

    public virtual SysService SysService { get; set; } = null!;
}
