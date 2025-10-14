using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransRepeat
{
    public int Id { get; set; }

    public int RepeatCount { get; set; }

    public int RepeatNo { get; set; }

    public int NextRef { get; set; }

    public int PrevRef { get; set; }

    public int ApTransactionId { get; set; }

    public int ApTransactionId1 { get; set; }

    public int Interval { get; set; }

    public virtual ApTransaction ApTransactionId1Navigation { get; set; } = null!;
}
