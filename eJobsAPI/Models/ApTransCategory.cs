using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<ApTransaction> ApTransactions { get; set; } = new List<ApTransaction>();
}
