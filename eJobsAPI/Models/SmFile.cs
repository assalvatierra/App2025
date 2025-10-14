using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmFile
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public string Link { get; set; } = null!;

    public int SmProductId { get; set; }

    public virtual SmProduct SmProduct { get; set; } = null!;
}
