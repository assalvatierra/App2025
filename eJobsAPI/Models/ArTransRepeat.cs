using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArTransRepeat
{
    public int Id { get; set; }

    public int PrevRef { get; set; }

    public int NextRef { get; set; }

    public int RepeatCount { get; set; }

    public int RpeatNo { get; set; }

    public int Interval { get; set; }

    public int ArTransactionId { get; set; }

    public virtual ArTransaction ArTransaction { get; set; } = null!;
}
