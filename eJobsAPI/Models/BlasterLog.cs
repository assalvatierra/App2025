using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class BlasterLog
{
    public int Id { get; set; }

    public int EmailBlasterLogsId { get; set; }

    public int EmailBlasterTemplateId { get; set; }

    public int ReportId { get; set; }

    public virtual EmailBlasterLog EmailBlasterLogs { get; set; } = null!;

    public virtual EmailBlasterTemplate EmailBlasterTemplate { get; set; } = null!;
}
