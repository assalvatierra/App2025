using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesProcStatus
{
    public int Id { get; set; }

    public DateTime DtStatus { get; set; }

    public int SalesProcStatusCodeId { get; set; }

    public int SalesLeadId { get; set; }

    public virtual SalesLead SalesLead { get; set; } = null!;

    public virtual SalesProcStatusCode SalesProcStatusCode { get; set; } = null!;
}
