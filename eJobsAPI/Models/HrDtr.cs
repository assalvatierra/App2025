using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrDtr
{
    public int Id { get; set; }

    public int HrSalaryId { get; set; }

    public DateTime DtrDate { get; set; }

    public int HrDtrStatusId { get; set; }

    public int HrPersonelId { get; set; }

    public TimeOnly TimeIn { get; set; }

    public TimeOnly TimeOut { get; set; }

    public decimal ActualHrs { get; set; }

    public int RoundHrs { get; set; }

    public int HrPayrollId { get; set; }

    public virtual HrDtrStatus HrDtrStatus { get; set; } = null!;

    public virtual HrPayroll HrPayroll { get; set; } = null!;

    public virtual HrPersonel HrPersonel { get; set; } = null!;

    public virtual HrSalary HrSalary { get; set; } = null!;
}
