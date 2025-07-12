using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArAccntTerm
{
    public int Id { get; set; }

    public DateTime DtTerm { get; set; }

    public int NoOfDays { get; set; }

    public string? Remarks { get; set; }

    public int ArAccountId { get; set; }

    public string ApprovedBy { get; set; } = null!;

    public int ArAccntTermStatusId { get; set; }

    public virtual ArAccntTermStatus ArAccntTermStatus { get; set; } = null!;

    public virtual ArAccount ArAccount { get; set; } = null!;
}
