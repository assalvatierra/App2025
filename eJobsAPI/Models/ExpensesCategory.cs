using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ExpensesCategory
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public virtual ICollection<Expense> Expenses { get; set; } = new List<Expense>();
}
