using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustNotifRecipientList
{
    public int Id { get; set; }

    public string? Email { get; set; }

    public string? Mobile { get; set; }

    public virtual ICollection<CustNotifRecipient> CustNotifRecipients { get; set; } = new List<CustNotifRecipient>();
}
