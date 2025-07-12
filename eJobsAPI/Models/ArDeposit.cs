using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArDeposit
{
    public int Id { get; set; }

    public DateTime DtDeposit { get; set; }

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public string? Reference { get; set; }

    public int ArDepositBankId { get; set; }

    public virtual ArDepositBank ArDepositBank { get; set; } = null!;

    public virtual ICollection<ArTransDeposit> ArTransDeposits { get; set; } = new List<ArTransDeposit>();
}
