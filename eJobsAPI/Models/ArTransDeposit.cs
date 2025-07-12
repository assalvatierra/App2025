using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArTransDeposit
{
    public int Id { get; set; }

    public int ArTransactionId { get; set; }

    public int ArDepositId { get; set; }

    public virtual ArDeposit ArDeposit { get; set; } = null!;

    public virtual ArTransaction ArTransaction { get; set; } = null!;
}
