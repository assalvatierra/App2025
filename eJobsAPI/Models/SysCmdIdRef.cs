using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SysCmdIdRef
{
    public int Id { get; set; }

    public int CmdId { get; set; }

    public string Description { get; set; } = null!;

    public string? Remarks { get; set; }
}
