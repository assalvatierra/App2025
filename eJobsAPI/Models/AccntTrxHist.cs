using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AccntTrxHist
{
    public int Id { get; set; }

    public string DtHist { get; set; } = null!;

    public string HistType { get; set; } = null!;

    public string OldData { get; set; } = null!;

    public string User { get; set; } = null!;
}
