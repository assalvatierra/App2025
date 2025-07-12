using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesLeadSupActivity
{
    public int Id { get; set; }

    public int SalesLeadId { get; set; }

    public int SupplierActivityId { get; set; }

    public string IconPath { get; set; } = null!;

    public virtual SalesLead SalesLead { get; set; } = null!;

    public virtual SupplierActivity SupplierActivity { get; set; } = null!;
}
