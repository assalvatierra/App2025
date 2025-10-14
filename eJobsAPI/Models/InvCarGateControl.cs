using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvCarGateControl
{
    public int Id { get; set; }

    public int InvItemId { get; set; }

    public int InOutFlag { get; set; }

    public string Odometer { get; set; } = null!;

    public DateTime DtControl { get; set; }

    public string? Remarks { get; set; }

    public string? Driver { get; set; }

    public string? Inspector { get; set; }

    public int? JobMainId { get; set; }

    public int? CustomerId { get; set; }

    public int? DriverId { get; set; }

    public virtual InvItem InvItem { get; set; } = null!;
}
