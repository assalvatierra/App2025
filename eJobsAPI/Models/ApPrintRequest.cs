using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApPrintRequest
{
    public int Id { get; set; }

    public DateTime DtRequest { get; set; }

    public string RequestBy { get; set; } = null!;

    public virtual ICollection<ApTransPrintReq> ApTransPrintReqs { get; set; } = new List<ApTransPrintReq>();
}
