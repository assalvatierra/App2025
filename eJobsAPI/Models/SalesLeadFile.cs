using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesLeadFile
{
    public int Id { get; set; }

    public string Link { get; set; } = null!;

    public int SalesLeadId { get; set; }

    public virtual SalesLead SalesLead { get; set; } = null!;
}
