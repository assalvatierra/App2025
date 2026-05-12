using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class PayPeriod
{
    public int Id { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public DateTime DateFrom { get; set; }

    public DateTime DateTo { get; set; }

    public string Notes { get; set; } = null!;

    public DateTime PayDate { get; set; }

    public int? ItemStatusId { get; set; }

    public int? ItemTypeId { get; set; }

    public virtual ItemType? ItemType { get; set; }
}
