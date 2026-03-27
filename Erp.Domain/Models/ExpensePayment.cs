using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ExpensePayment
{
    public int Id { get; set; }

    public int? ExpensesId { get; set; }

    public int? PaymentsId { get; set; }

    public virtual Expense? Expenses { get; set; }

    public virtual Payment? Payments { get; set; }
}
