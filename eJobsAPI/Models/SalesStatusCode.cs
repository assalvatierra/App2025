using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesStatusCode
{
    public int Id { get; set; }

    public int? SeqNo { get; set; }

    public string Name { get; set; } = null!;

    public string? IconPath { get; set; }

    public int SalesStatusTypeId { get; set; }

    public int? OrderNo { get; set; }

    public virtual SalesStatusType SalesStatusType { get; set; } = null!;

    public virtual ICollection<SalesStatus> SalesStatuses { get; set; } = new List<SalesStatus>();
}
