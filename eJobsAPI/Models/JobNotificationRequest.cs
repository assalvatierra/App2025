using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobNotificationRequest
{
    public int Id { get; set; }

    public int ServiceId { get; set; }

    public DateTime ReqDt { get; set; }

    public string? RefId { get; set; }
}
