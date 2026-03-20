using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Resource
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public string? Code { get; set; }

    public int? SortOrder { get; set; }

    public int? ItemTypeId { get; set; }

    public int? ItemStatusId { get; set; }

    public string? JsonProperties { get; set; }

    public virtual ICollection<Timesheet> TimesheetResourceId1Navigations { get; set; } = new List<Timesheet>();

    public virtual ICollection<Timesheet> TimesheetResources { get; set; } = new List<Timesheet>();
}
