using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<ApTransaction> ApTransactions { get; set; } = new List<ApTransaction>();
}
