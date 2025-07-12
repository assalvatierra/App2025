using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SysSetting
{
    public int Id { get; set; }

    public string SysKey { get; set; } = null!;

    public string SysValue { get; set; } = null!;

    public string Remarks { get; set; } = null!;
}
