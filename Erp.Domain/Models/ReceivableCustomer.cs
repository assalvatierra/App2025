using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ReceivableCustomer
{
    public int Id { get; set; }

    public int? ReceivablesId { get; set; }

    public int? EntityId { get; set; }

    public int? ItemTypeId { get; set; }

    public virtual Receivable? Receivables { get; set; }
}
