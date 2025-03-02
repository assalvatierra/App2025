using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class BusinessUnit
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public string? Code { get; set; }

    public int? SortOrder { get; set; }

    public virtual ICollection<Entity> Entities { get; set; } = new List<Entity>();

    public virtual ICollection<JobMain> JobMains { get; set; } = new List<JobMain>();
}
