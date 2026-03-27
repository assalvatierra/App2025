using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Receivable
{
    public int Id { get; set; }

    public string TrxRef { get; set; } = null!;

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

    public virtual ICollection<JobReceivable> JobReceivables { get; set; } = new List<JobReceivable>();

    public virtual ICollection<ReceivableCustomer> ReceivableCustomers { get; set; } = new List<ReceivableCustomer>();

    public virtual ICollection<ReceivablePayment> ReceivablePayments { get; set; } = new List<ReceivablePayment>();

    public virtual ICollection<ReceivableStatus> ReceivableStatuses { get; set; } = new List<ReceivableStatus>();
}
