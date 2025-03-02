using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobServiceContact
{
    public int Id { get; set; }

    public int? ContactId { get; set; }

    public int? JobServiceId { get; set; }

    public string Notes { get; set; } = null!;

    public bool IsPrimary { get; set; }

    public virtual Contact? Contact { get; set; }

    public virtual JobService? JobService { get; set; }
}
