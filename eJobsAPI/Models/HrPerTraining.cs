using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrPerTraining
{
    public int Id { get; set; }

    public int HrTrainingId { get; set; }

    public int HrPersonelId { get; set; }

    public DateTime DtCompleted { get; set; }

    public virtual HrPersonel HrPersonel { get; set; } = null!;

    public virtual HrTraining HrTraining { get; set; } = null!;
}
