using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public int Code { get; set; }

    public virtual ICollection<ApTransaction> ApTransactions { get; set; } = new List<ApTransaction>();
}
