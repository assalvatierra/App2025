using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmProdDesc
{
    public int Id { get; set; }

    public int SmProductId { get; set; }

    public int SortNo { get; set; }

    public string? Description { get; set; }

    public int SmProductId1 { get; set; }

    public virtual SmProduct SmProduct { get; set; } = null!;
}
