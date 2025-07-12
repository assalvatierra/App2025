using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AccntCategory
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int OrderNo { get; set; }

    public int AccntTypeId { get; set; }

    public virtual ICollection<AccntMain> AccntMains { get; set; } = new List<AccntMain>();

    public virtual AccntType AccntType { get; set; } = null!;
}
