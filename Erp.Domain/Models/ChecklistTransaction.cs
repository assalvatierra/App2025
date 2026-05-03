using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ChecklistTransaction
{
    public int Id { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public string? Notes { get; set; }

    public bool IsDone { get; set; }

    public int? ChecklistItemId { get; set; }

    public int? RefId { get; set; }

    public string RefObject { get; set; } = null!;

    public virtual ChecklistItem? ChecklistItem { get; set; }
}
