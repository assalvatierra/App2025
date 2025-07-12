using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvCarRecord
{
    public int Id { get; set; }

    public int InvItemId { get; set; }

    public int InvCarRecordTypeId { get; set; }

    public int Odometer { get; set; }

    public DateTime DtDone { get; set; }

    public int NextOdometer { get; set; }

    public DateTime NextSched { get; set; }

    public string? Remarks { get; set; }

    public virtual InvCarRecordType InvCarRecordType { get; set; } = null!;

    public virtual InvItem InvItem { get; set; } = null!;
}
