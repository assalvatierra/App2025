using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SysService
{
    public int Id { get; set; }

    public string SysCode { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string IconPath { get; set; } = null!;

    public int SeqNo { get; set; }

    public string? IconFa { get; set; }

    public virtual ICollection<EntService> EntServices { get; set; } = new List<EntService>();

    public virtual ICollection<SysServiceMenu> SysServiceMenus { get; set; } = new List<SysServiceMenu>();
}
