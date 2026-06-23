using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobServiceBudget
{
    public int Id { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public Guid? RecordGuid { get; set; }

    public int? JobMainId { get; set; }

    public int? JobServiceId { get; set; }

    public decimal Amount { get; set; }

    public string? Remarks { get; set; }

    public int? ItemTypeId { get; set; }

    public int? ItemStatusId { get; set; }
}
