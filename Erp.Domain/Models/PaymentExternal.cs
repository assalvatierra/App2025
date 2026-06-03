using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class PaymentExternal
{
    public int Id { get; set; }

    public string? Gateway { get; set; }

    public decimal Amount { get; set; }

    public string Currency { get; set; } = null!;

    public string JsonInfo { get; set; } = null!;

    public int? JobMainId { get; set; }
}
