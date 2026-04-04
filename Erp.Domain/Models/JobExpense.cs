using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobExpense
{
    public int Id { get; set; }

    public int? ExpensesId { get; set; }

    public int? JobMainId { get; set; }

    public virtual JobMain? JobMain { get; set; }

    public virtual Expense? Expense { get; set; }
}
