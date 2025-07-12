using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrPayroll
{
    public int Id { get; set; }

    public int HrPersonelId { get; set; }

    public DateTime DtStart { get; set; }

    public DateTime DtEnd { get; set; }

    public decimal Salary { get; set; }

    public decimal Allowance { get; set; }

    public decimal Deduction { get; set; }

    public string Yearno { get; set; } = null!;

    public string Monthno { get; set; } = null!;

    public string Status { get; set; } = null!;

    public virtual ICollection<HrDtr> HrDtrs { get; set; } = new List<HrDtr>();

    public virtual HrPersonel HrPersonel { get; set; } = null!;
}
