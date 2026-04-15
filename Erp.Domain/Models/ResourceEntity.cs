using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ResourceEntity
{
    public int Id { get; set; }

    public int? ResourceId { get; set; }

    public int? EntityId { get; set; }

    // Navigation properties
    public virtual Resource? Resource { get; set; }
    public virtual Entity? Entity { get; set; }
}
