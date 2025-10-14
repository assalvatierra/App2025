using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrRptUnit
{
    public int Id { get; set; }

    public int CrRptUnitExpenseId { get; set; }

    public int CrLogUnitId { get; set; }

    public int RptSeqNo { get; set; }

    public virtual CrLogUnit CrLogUnit { get; set; } = null!;

    public virtual CrRptUnitExpense CrRptUnitExpense { get; set; } = null!;
}
