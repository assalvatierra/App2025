using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class EntSetting
{
    public int Id { get; set; }

    public int SysSetupTypeId { get; set; }

    public int EntBusinessId { get; set; }

    public string Value1 { get; set; } = null!;

    public string Value2 { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public virtual EntBusiness EntBusiness { get; set; } = null!;

    public virtual SysSetupType SysSetupType { get; set; } = null!;
}
