using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Timesheet
{
    public int Id { get; set; }

    public DateTime TsDate { get; set; }

    public string? Remarks { get; set; }

    public int? ResourceId { get; set; }

    public int? ResourceId1 { get; set; }

    public int? ItemStatusId { get; set; }

    public virtual Resource? Resource { get; set; }

    public virtual Resource? ResourceId1Navigation { get; set; }
}
