using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AccntType
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string NormalForm { get; set; } = null!;

    public virtual ICollection<AccntCategory> AccntCategories { get; set; } = new List<AccntCategory>();

    public virtual ICollection<AccntMain> AccntMains { get; set; } = new List<AccntMain>();
}
