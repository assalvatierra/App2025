using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrTrainingSkill
{
    public int Id { get; set; }

    public int HrTrainingId { get; set; }

    public int HrSkillId { get; set; }

    public int HrProficiencyId { get; set; }

    public virtual HrProficiency HrProficiency { get; set; } = null!;

    public virtual HrSkill HrSkill { get; set; } = null!;

    public virtual HrTraining HrTraining { get; set; } = null!;
}
