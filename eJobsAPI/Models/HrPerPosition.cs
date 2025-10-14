using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrPerPosition
{
    public int Id { get; set; }

    public int HrPersonelId { get; set; }

    public int HrPositionId { get; set; }

    public DateTime DtStart { get; set; }

    public virtual HrPersonel HrPersonel { get; set; } = null!;

    public virtual HrPosition HrPosition { get; set; } = null!;
}
