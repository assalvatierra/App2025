using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrPersonel
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? PassportNo { get; set; }

    public string? Sssid { get; set; }

    public string? Tin { get; set; }

    public string? DriverId { get; set; }

    public string? Remarks { get; set; }

    public int HrPersonelStatusId { get; set; }

    public virtual ICollection<HrDtr> HrDtrs { get; set; } = new List<HrDtr>();

    public virtual ICollection<HrPayroll> HrPayrolls { get; set; } = new List<HrPayroll>();

    public virtual ICollection<HrPerDoc> HrPerDocs { get; set; } = new List<HrPerDoc>();

    public virtual ICollection<HrPerPosition> HrPerPositions { get; set; } = new List<HrPerPosition>();

    public virtual ICollection<HrPerSkill> HrPerSkills { get; set; } = new List<HrPerSkill>();

    public virtual ICollection<HrPerTraining> HrPerTrainings { get; set; } = new List<HrPerTraining>();

    public virtual HrPersonelStatus HrPersonelStatus { get; set; } = null!;

    public virtual ICollection<HrProfile> HrProfiles { get; set; } = new List<HrProfile>();

    public virtual ICollection<HrSalary> HrSalaries { get; set; } = new List<HrSalary>();
}
