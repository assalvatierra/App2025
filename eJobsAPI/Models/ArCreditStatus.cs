using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArCreditStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<ArAccntCredit> ArAccntCredits { get; set; } = new List<ArAccntCredit>();
}
