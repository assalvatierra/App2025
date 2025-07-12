using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarViewPage
{
    public int Id { get; set; }

    public int CarUnitId { get; set; }

    public string Viewname { get; set; } = null!;

    public virtual CarUnit CarUnit { get; set; } = null!;
}
