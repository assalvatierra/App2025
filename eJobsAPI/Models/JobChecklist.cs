using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobChecklist
{
    public int Id { get; set; }

    public DateTime DtEntered { get; set; }

    public DateTime DtDue { get; set; }

    public DateTime DtNotification { get; set; }

    public string Description { get; set; } = null!;

    public string? Remarks { get; set; }

    public int? RefId { get; set; }
}
