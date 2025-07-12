using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<CrLogFuel> CrLogFuels { get; set; } = new List<CrLogFuel>();
}
