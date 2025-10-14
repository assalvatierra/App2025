using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrPosition
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<HrPerPosition> HrPerPositions { get; set; } = new List<HrPerPosition>();
}
