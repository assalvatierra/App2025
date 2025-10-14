using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobContact
{
    public int Id { get; set; }

    public int? JobMainId { get; set; }

    public int? ContactId { get; set; }

    public bool IsPrimary { get; set; }

    public string? Notes { get; set; }

    public virtual Contact? Contact { get; set; }

    public virtual JobMain? JobMain { get; set; }
}
