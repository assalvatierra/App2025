using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrDtrStatus
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public decimal Factor { get; set; }

    public virtual ICollection<HrDtr> HrDtrs { get; set; } = new List<HrDtr>();
}
