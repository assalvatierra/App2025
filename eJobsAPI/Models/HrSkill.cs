using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrSkill
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public string? Remarks { get; set; }

    public virtual ICollection<HrPerSkill> HrPerSkills { get; set; } = new List<HrPerSkill>();

    public virtual ICollection<HrTrainingSkill> HrTrainingSkills { get; set; } = new List<HrTrainingSkill>();
}
