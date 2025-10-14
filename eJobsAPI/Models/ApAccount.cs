using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApAccount
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Landline { get; set; }

    public string Mobile { get; set; } = null!;

    public string? Email { get; set; }

    public string? ContactPerson { get; set; }

    public string? Address { get; set; }

    public string? Remarks { get; set; }

    public int ApAccStatusId { get; set; }

    public string? Landline2 { get; set; }

    public string? Mobile2 { get; set; }

    public virtual ApAccStatus ApAccStatus { get; set; } = null!;

    public virtual ICollection<ApCashFlow> ApCashFlows { get; set; } = new List<ApCashFlow>();

    public virtual ICollection<ApPayment> ApPayments { get; set; } = new List<ApPayment>();

    public virtual ICollection<ApTransaction> ApTransactions { get; set; } = new List<ApTransaction>();
}
