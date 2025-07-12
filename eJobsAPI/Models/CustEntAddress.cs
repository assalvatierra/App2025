using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntAddress
{
    public int Id { get; set; }

    public int CustEntMainId { get; set; }

    public string? Line1 { get; set; }

    public string? Line2 { get; set; }

    public string? Line3 { get; set; }

    public string? Line4 { get; set; }

    public string? Line5 { get; set; }

    public bool IsBilling { get; set; }

    public bool IsPrimary { get; set; }

    public virtual CustEntMain CustEntMain { get; set; } = null!;
}
