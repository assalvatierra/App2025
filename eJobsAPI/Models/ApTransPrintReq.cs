using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransPrintReq
{
    public int Id { get; set; }

    public int ApPrintRequestId { get; set; }

    public int ApTransactionId { get; set; }

    public virtual ApPrintRequest ApPrintRequest { get; set; } = null!;

    public virtual ApTransaction ApTransaction { get; set; } = null!;
}
