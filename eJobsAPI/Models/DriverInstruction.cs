using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class DriverInstruction
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public int OrderNo { get; set; }

    public virtual ICollection<DriverInsJobService> DriverInsJobServices { get; set; } = new List<DriverInsJobService>();
}
