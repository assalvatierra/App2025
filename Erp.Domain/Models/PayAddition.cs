using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class PayAddition
{
    public int Id { get; set; }

    public int? PayPeriodId { get; set; }

    public int? ResourceId { get; set; }

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public bool IsAdd { get; set; }
}
