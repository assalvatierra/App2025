using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntAssign
{
    public int Id { get; set; }

    public string Assigned { get; set; } = null!;

    public string? Remarks { get; set; }

    public DateTime Date { get; set; }

    public int CustEntMainId { get; set; }

    public virtual CustEntMain CustEntMain { get; set; } = null!;
}
