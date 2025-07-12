using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvCarRecordType
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public string? SysCode { get; set; }

    public int OdoInterval { get; set; }

    public int DaysInterval { get; set; }

    public string? IconPath { get; set; }

    public int OrderNo { get; set; }

    public virtual ICollection<InvCarRecord> InvCarRecords { get; set; } = new List<InvCarRecord>();
}
