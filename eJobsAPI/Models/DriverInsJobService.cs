using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class DriverInsJobService
{
    public int Id { get; set; }

    public int DriverInstructionsId { get; set; }

    public int JobServicesId { get; set; }

    public virtual DriverInstruction DriverInstructions { get; set; } = null!;
}
