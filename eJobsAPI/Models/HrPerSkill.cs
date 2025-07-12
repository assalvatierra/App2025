using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrPerSkill
{
    public int Id { get; set; }

    public int HrSkillId { get; set; }

    public DateTime DtAcquired { get; set; }

    public int HrProficiencyId { get; set; }

    public int HrPersonelId { get; set; }

    public virtual HrPersonel HrPersonel { get; set; } = null!;

    public virtual HrProficiency HrProficiency { get; set; } = null!;

    public virtual HrSkill HrSkill { get; set; } = null!;
}
