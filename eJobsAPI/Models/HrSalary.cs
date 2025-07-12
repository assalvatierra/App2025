using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrSalary
{
    public int Id { get; set; }

    public int HrPersonelId { get; set; }

    public DateTime DtStart { get; set; }

    public decimal RatePerHr { get; set; }

    public virtual ICollection<HrDtr> HrDtrs { get; set; } = new List<HrDtr>();

    public virtual HrPersonel HrPersonel { get; set; } = null!;
}
