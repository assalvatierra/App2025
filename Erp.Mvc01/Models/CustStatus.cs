using System;
using System.Collections.Generic;

namespace Erp.Mvc01.Models;

public partial class CustStatus
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string? Display { get; set; }

    public string? Remarks { get; set; }

    public string? OrderNo { get; set; }

    public bool? IsActive { get; set; }

    public bool IsDefault { get; set; }

    public virtual ICollection<CustMain> CustMains { get; set; } = new List<CustMain>();
}
