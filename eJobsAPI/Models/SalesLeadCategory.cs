using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesLeadCategory
{
    public int Id { get; set; }

    public int SalesLeadCatCodeId { get; set; }

    public int SalesLeadId { get; set; }

    public virtual SalesLead SalesLead { get; set; } = null!;

    public virtual SalesLeadCatCode SalesLeadCatCode { get; set; } = null!;
}
