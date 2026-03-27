using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Expense
{
    public int Id { get; set; }

    public DateTime TrxDate { get; set; }

    public decimal Amount { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public string? Remarks { get; set; }

    public int? EntityId { get; set; }

    public virtual ICollection<ExpensePayment> ExpensePayments { get; set; } = new List<ExpensePayment>();

    public virtual ICollection<ExpenseStatus> ExpenseStatuses { get; set; } = new List<ExpenseStatus>();
}
