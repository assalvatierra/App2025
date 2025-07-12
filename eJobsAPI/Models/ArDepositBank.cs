using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArDepositBank
{
    public int Id { get; set; }

    public string AccountName { get; set; } = null!;

    public virtual ICollection<ArDeposit> ArDeposits { get; set; } = new List<ArDeposit>();
}
