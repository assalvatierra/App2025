using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrPersonelStatus
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public virtual ICollection<HrPersonel> HrPersonels { get; set; } = new List<HrPersonel>();
}
