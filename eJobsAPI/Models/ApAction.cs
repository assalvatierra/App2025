using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApAction
{
    public int Id { get; set; }

    public DateTime DtPerformed { get; set; }

    public string PerformedBy { get; set; } = null!;

    public int ApTransactionId { get; set; }

    public int ApActionItemId { get; set; }

    public virtual ApActionItem ApActionItem { get; set; } = null!;

    public virtual ApTransaction ApTransaction { get; set; } = null!;
}
