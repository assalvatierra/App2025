using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AsExpBiller
{
    public int Id { get; set; }

    public string ShortName { get; set; } = null!;

    public string? FullName { get; set; }

    public string? Address { get; set; }

    public string? Contact { get; set; }

    public string? Contact2 { get; set; }

    public string? Remarks { get; set; }

    public virtual ICollection<AsExpense> AsExpenses { get; set; } = new List<AsExpense>();
}
