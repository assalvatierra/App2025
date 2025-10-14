using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CashExpense
{
    public int Id { get; set; }

    public int JobMainId { get; set; }

    public DateTime DtExpense { get; set; }

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public string? RecievedBy { get; set; }

    public string? ReleasedBy { get; set; }

    public virtual JobMain JobMain { get; set; } = null!;
}
