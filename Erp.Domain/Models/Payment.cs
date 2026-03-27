using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Payment
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

    public string Remarks { get; set; } = null!;

    public int? EntityId { get; set; }

    public int? ItemTypeId { get; set; }

    public int? ItemStatusId { get; set; }

    public string? AdditionalInfo { get; set; }

    public virtual ICollection<ExpensePayment> ExpensePayments { get; set; } = new List<ExpensePayment>();

    public virtual ICollection<ReceivablePayment> ReceivablePayments { get; set; } = new List<ReceivablePayment>();
}
