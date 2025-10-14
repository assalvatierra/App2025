using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArAction
{
    public int Id { get; set; }

    public DateTime DtPerformed { get; set; }

    public string PreformedBy { get; set; } = null!;

    public int ArTransactionId { get; set; }

    public int ArActionItemId { get; set; }

    public string? Remarks { get; set; }

    public virtual ArActionItem ArActionItem { get; set; } = null!;

    public virtual ArTransaction ArTransaction { get; set; } = null!;
}
