using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArTransPost
{
    public int Id { get; set; }

    public DateTime DtPost { get; set; }

    public decimal Amount { get; set; }

    public decimal Balance { get; set; }

    public int ArTransactionId { get; set; }

    public virtual ArTransaction ArTransaction { get; set; } = null!;
}
