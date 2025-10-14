using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class EmailBlasterLog
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public DateTime DateTime { get; set; }

    public string Status { get; set; } = null!;

    public int CustId { get; set; }

    public virtual ICollection<BlasterLog> BlasterLogs { get; set; } = new List<BlasterLog>();
}
