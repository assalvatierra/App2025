using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogCashType
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<CrLogCashRelease> CrLogCashReleases { get; set; } = new List<CrLogCashRelease>();
}
