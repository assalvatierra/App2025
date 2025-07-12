using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustNotifRecipient
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int CustNotifId { get; set; }

    public int NotifRecipientId { get; set; }

    public virtual CustNotif CustNotif { get; set; } = null!;

    public virtual ICollection<CustNotifActivity> CustNotifActivities { get; set; } = new List<CustNotifActivity>();

    public virtual Customer Customer { get; set; } = null!;

    public virtual CustNotifRecipientList NotifRecipient { get; set; } = null!;
}
