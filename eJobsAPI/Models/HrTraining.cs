using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrTraining
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<HrPerTraining> HrPerTrainings { get; set; } = new List<HrPerTraining>();

    public virtual ICollection<HrTrainingSkill> HrTrainingSkills { get; set; } = new List<HrTrainingSkill>();
}
