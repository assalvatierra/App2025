using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobAction
{
    public int Id { get; set; }

    public int JobServicesId { get; set; }

    public string? AssignedTo { get; set; }

    public string? PerformedBy { get; set; }

    public DateTime? DtAssigned { get; set; }

    public DateTime? DtPerformed { get; set; }

    public int SrvActionItemId { get; set; }

    public string? Remarks { get; set; }

    public virtual JobService JobServices { get; set; } = null!;

    public virtual SrvActionItem SrvActionItem { get; set; } = null!;
}
