using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public int SortNo { get; set; }

    public virtual ICollection<ArTransaction> ArTransactions { get; set; } = new List<ArTransaction>();
}
