using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobServiceRequirement
{
    public int Id { get; set; }

    public int? JobServiceId { get; set; }

    public int RequiredQty { get; set; }

    public int? ItemTypeId { get; set; }

    public string? Notes { get; set; }
}
