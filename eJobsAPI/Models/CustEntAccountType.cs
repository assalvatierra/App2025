using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntAccountType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string SysCode { get; set; } = null!;

    public virtual ICollection<CustEntMain> CustEntMains { get; set; } = new List<CustEntMain>();
}
