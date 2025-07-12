using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AsExpense
{
    public int Id { get; set; }

    public DateTime TrxDate { get; set; }

    public string TrxDesc { get; set; } = null!;

    public decimal Amount { get; set; }

    public string? TrxRemarks { get; set; }

    public DateTime DateEntered { get; set; }

    public int AsCostCenterId { get; set; }

    public int AsExpCategoryId { get; set; }

    public int AsExpBillerId { get; set; }

    public virtual AsCostCenter AsCostCenter { get; set; } = null!;

    public virtual AsExpBiller AsExpBiller { get; set; } = null!;

    public virtual AsExpCategory AsExpCategory { get; set; } = null!;
}
