using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogCashSalary
{
    public int Id { get; set; }

    public DateOnly Date { get; set; }

    public int CrLogDriverId { get; set; }

    public bool ExcludeOt { get; set; }

    public virtual ICollection<CrLogCashGroup> CrLogCashGroups { get; set; } = new List<CrLogCashGroup>();

    public virtual CrLogDriver CrLogDriver { get; set; } = null!;
}
