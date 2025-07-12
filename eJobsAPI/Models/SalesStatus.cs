using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesStatus
{
    public int Id { get; set; }

    public DateTime DtStatus { get; set; }

    public int SalesStatusCodeId { get; set; }

    public int SalesLeadId { get; set; }

    public int SalesStatusStatusId { get; set; }

    public virtual SalesLead SalesLead { get; set; } = null!;

    public virtual SalesStatusCode SalesStatusCode { get; set; } = null!;
}
