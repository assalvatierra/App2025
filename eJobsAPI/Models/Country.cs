using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Country
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public virtual ICollection<Supplier> Suppliers { get; set; } = new List<Supplier>();
}
