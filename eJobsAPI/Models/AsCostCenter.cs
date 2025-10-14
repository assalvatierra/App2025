using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AsCostCenter
{
    public int Id { get; set; }

    public string CcName { get; set; } = null!;

    public string? XxRemarks { get; set; }

    public virtual ICollection<AsExpense> AsExpenses { get; set; } = new List<AsExpense>();

    public virtual ICollection<AsSale> AsSales { get; set; } = new List<AsSale>();
}
