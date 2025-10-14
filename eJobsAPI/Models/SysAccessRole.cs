using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SysAccessRole
{
    public int Id { get; set; }

    public string RoleId { get; set; } = null!;

    public int SysMenuId { get; set; }

    public virtual SysMenu SysMenu { get; set; } = null!;
}
