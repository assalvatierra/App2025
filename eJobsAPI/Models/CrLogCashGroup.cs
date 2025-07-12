using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogCashGroup
{
    public int Id { get; set; }

    public int CrLogCashSalaryId { get; set; }

    public int CrLogCashReleaseId { get; set; }

    public virtual CrLogCashRelease CrLogCashRelease { get; set; } = null!;

    public virtual CrLogCashSalary CrLogCashSalary { get; set; } = null!;
}
