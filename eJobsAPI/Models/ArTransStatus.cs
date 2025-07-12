using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArTransStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<ArTransaction> ArTransactions { get; set; } = new List<ArTransaction>();
}
