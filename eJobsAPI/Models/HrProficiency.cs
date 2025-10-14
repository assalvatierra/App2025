using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrProficiency
{
    public int Id { get; set; }

    public string Level { get; set; } = null!;

    public virtual ICollection<HrPerSkill> HrPerSkills { get; set; } = new List<HrPerSkill>();

    public virtual ICollection<HrTrainingSkill> HrTrainingSkills { get; set; } = new List<HrTrainingSkill>();
}
