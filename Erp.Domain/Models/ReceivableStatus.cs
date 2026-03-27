using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ReceivableStatus
{
    public int Id { get; set; }

    public int? ReceivableId { get; set; }

    public int? ItemStatusId { get; set; }

    public DateTime StatusDate { get; set; }

    public string? Remarks { get; set; }

    public virtual Receivable? Receivable { get; set; }
}
