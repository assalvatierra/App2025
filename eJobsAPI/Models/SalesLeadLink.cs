using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesLeadLink
{
    public int Id { get; set; }

    public int SalesLeadId { get; set; }

    public int JobMainId { get; set; }

    public virtual JobMain JobMain { get; set; } = null!;

    public virtual SalesLead SalesLead { get; set; } = null!;
}
