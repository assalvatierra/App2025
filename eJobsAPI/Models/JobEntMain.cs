using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobEntMain
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public int CustEntMainId { get; set; }

    public virtual CustEntMain CustEntMain { get; set; } = null!;
}
