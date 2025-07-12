using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArAccntTermStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<ArAccntTerm> ArAccntTerms { get; set; } = new List<ArAccntTerm>();
}
