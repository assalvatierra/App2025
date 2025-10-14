using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AsSale
{
    public int Id { get; set; }

    public DateTime TrxDate { get; set; }

    public string TrxDesc { get; set; } = null!;

    public decimal Amount { get; set; }

    public DateTime? DateEntered { get; set; }

    public int AsCostCenterId { get; set; }

    public int AsIncCategoryId { get; set; }

    public int AsIncClientId { get; set; }

    public string? OrRef { get; set; }

    public virtual AsCostCenter AsCostCenter { get; set; } = null!;

    public virtual AsIncCategory AsIncCategory { get; set; } = null!;

    public virtual AsIncClient AsIncClient { get; set; } = null!;
}
