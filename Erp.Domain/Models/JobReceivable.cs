using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobReceivable
{
    public int Id { get; set; }

    public int? ReceivablesId { get; set; }

    public int? JobMainId { get; set; }

    public virtual Receivable? Receivables { get; set; }
}
