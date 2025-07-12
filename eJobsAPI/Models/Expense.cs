using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Expense
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public int SeqNo { get; set; }

    public int ExpensesCategoryId { get; set; }

    public virtual ExpensesCategory ExpensesCategory { get; set; } = null!;

    public virtual ICollection<JobExpense> JobExpenses { get; set; } = new List<JobExpense>();
}
