using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class PayExpense
{
    public int Id { get; set; }

    public int? ExpenseId { get; set; }

    public int? PayPeriodId { get; set; }
}
