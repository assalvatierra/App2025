using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ItemTypeClass
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public string? Code { get; set; }

    public int? SortOrder { get; set; }

    public virtual ICollection<ItemType> ItemTypes { get; set; } = new List<ItemType>();
}
