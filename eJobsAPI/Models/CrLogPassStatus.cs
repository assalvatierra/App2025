using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogPassStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<CrLogPassenger> CrLogPassengers { get; set; } = new List<CrLogPassenger>();
}
