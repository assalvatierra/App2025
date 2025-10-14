using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApCashFlowPostGroup
{
    public int Id { get; set; }

    public int ApCashFlowId { get; set; }

    public int ApTransPostId { get; set; }

    public virtual ApCashFlow ApCashFlow { get; set; } = null!;

    public virtual ApTransPost ApTransPost { get; set; } = null!;
}
