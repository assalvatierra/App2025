using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrRptUnitExpense
{
    public int Id { get; set; }

    public string RptName { get; set; } = null!;

    public int RptNo { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<CrRptUnit> CrRptUnits { get; set; } = new List<CrRptUnit>();
}
