using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierPoStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public int OrderNo { get; set; }
}
