using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobSchedule
{
    public int Id { get; set; }

    public DateTime? Estimated { get; set; }

    public DateTime? Actual { get; set; }

    public decimal? Leadtime { get; set; }

    public string? Notes { get; set; }

    public int? JobServiceId { get; set; }

    public int? ItemTypeId { get; set; }

    public int? ItemStatusId { get; set; }
}
