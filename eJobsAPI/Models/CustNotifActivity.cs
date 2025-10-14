using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustNotifActivity
{
    public int Id { get; set; }

    public DateTime DtActivity { get; set; }

    public string Status { get; set; } = null!;

    public int CustNotifRecipientId { get; set; }

    public virtual CustNotifRecipient CustNotifRecipient { get; set; } = null!;
}
