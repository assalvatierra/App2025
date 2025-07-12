using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogPassRemark
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public int RemarksFor { get; set; }
}
