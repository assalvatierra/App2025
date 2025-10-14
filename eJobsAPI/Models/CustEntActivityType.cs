using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntActivityType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public int? Points { get; set; }
}
