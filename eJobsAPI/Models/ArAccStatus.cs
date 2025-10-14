using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArAccStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<ArAccount> ArAccounts { get; set; } = new List<ArAccount>();
}
