using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobTrail
{
    public int Id { get; set; }

    public string RefTable { get; set; } = null!;

    public string RefId { get; set; } = null!;

    public DateTime DtTrail { get; set; }

    public string User { get; set; } = null!;

    public string Action { get; set; } = null!;

    public string? Ipaddress { get; set; }
}
