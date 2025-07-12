using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobExpense
{
    public int Id { get; set; }

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public int JobMainId { get; set; }

    public int ExpensesId { get; set; }

    public int JobServicesId { get; set; }

    public DateTime? DtExpense { get; set; }

    public bool? IsReleased { get; set; }

    public bool? ForRelease { get; set; }

    public virtual Expense Expenses { get; set; } = null!;

    public virtual JobService JobServices { get; set; } = null!;
}
