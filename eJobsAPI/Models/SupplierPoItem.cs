using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierPoItem
{
    public int Id { get; set; }

    public int SupplierPoDtlId { get; set; }

    public int InvItemId { get; set; }
}
