using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SysMenu
{
    public int Id { get; set; }

    public string Menu { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public int ParentId { get; set; }

    public string? Controller { get; set; }

    public string? Action { get; set; }

    public string? Params { get; set; }

    public int? CmdId { get; set; }

    public int Seqno { get; set; }

    public int? SecKey { get; set; }

    public virtual ICollection<SysAccessRole> SysAccessRoles { get; set; } = new List<SysAccessRole>();

    public virtual ICollection<SysAccessUser> SysAccessUsers { get; set; } = new List<SysAccessUser>();

    public virtual ICollection<SysServiceMenu> SysServiceMenus { get; set; } = new List<SysServiceMenu>();
}
