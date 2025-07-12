using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Bank
{
    public int Id { get; set; }

    public string BankName { get; set; } = null!;

    public string BankBranch { get; set; } = null!;

    public string AccntName { get; set; } = null!;

    public string AccntNo { get; set; } = null!;

    public virtual ICollection<JobPayment> JobPayments { get; set; } = new List<JobPayment>();
}
