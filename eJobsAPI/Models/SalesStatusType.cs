using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesStatusType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<SalesStatusCode> SalesStatusCodes { get; set; } = new List<SalesStatusCode>();
}
