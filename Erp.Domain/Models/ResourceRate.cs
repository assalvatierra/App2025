using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class ResourceRate
{
    public int Id { get; set; }

    public int? ResourceId { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public DateTime ValidFrom { get; set; }

    public DateTime ValidTo { get; set; }

    public decimal Daily { get; set; }

    public decimal Monthly { get; set; }

    public decimal Hourly { get; set; }

    public decimal Percent { get; set; }

    public decimal OtRate { get; set; }
}
