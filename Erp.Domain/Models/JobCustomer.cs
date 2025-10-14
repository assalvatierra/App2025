using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobCustomer
{
    public int Id { get; set; }

    public int? JobMainId { get; set; }

    public int? CustomerId { get; set; }

    public bool IsPrimary { get; set; }

    public bool IsBillTo { get; set; }

    public string? Notes { get; set; }

    public virtual Entity? Customer { get; set; }

    public virtual JobMain? JobMain { get; set; }
}
