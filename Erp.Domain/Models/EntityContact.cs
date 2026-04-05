using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class EntityContact
{
    public int Id { get; set; }

    public int? ContactId { get; set; }

    public int? EntityId { get; set; }

    public string? Notes { get; set; }

    public bool IsActive { get; set; }

    public DateTime? ActiveFrom { get; set; }

    public DateTime? ActiveTo { get; set; }

    public virtual Contact? Contact { get; set; }

    public virtual Entity? Entity { get; set; }
}
