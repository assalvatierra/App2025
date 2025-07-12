using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustNotif
{
    public int Id { get; set; }

    public string? MsgTitle { get; set; }

    public string MsgBody { get; set; } = null!;

    public DateTime? DtEncoded { get; set; }

    public DateTime DtScheduled { get; set; }

    public string Occurence { get; set; } = null!;

    public bool IsEmail { get; set; }

    public bool IsSms { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<CustNotifRecipient> CustNotifRecipients { get; set; } = new List<CustNotifRecipient>();
}
