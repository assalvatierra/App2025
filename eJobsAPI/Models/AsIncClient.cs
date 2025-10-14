using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AsIncClient
{
    public int Id { get; set; }

    public string ShortName { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Company { get; set; }

    public string? Contact1 { get; set; }

    public string? Contact2 { get; set; }

    public string? Address { get; set; }

    public string? Remarks { get; set; }

    public virtual ICollection<AsSale> AsSales { get; set; } = new List<AsSale>();
}
