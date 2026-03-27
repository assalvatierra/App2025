using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ExpenseStatus
{
    public int Id { get; set; }

    public int? ExpenseId { get; set; }

    public int? ItemStatusId { get; set; }

    public DateTime StatusDate { get; set; }

    public string? Remarks { get; set; }

    public virtual Expense? Expense { get; set; }
}
