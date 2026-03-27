using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ReceivablePayment
{
    public int Id { get; set; }

    public int? ReceivablesId { get; set; }

    public int? PaymentsId { get; set; }

    public virtual Payment? Payments { get; set; }

    public virtual Receivable? Receivables { get; set; }
}
