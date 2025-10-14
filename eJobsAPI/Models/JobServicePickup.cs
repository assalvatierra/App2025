using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobServicePickup
{
    public int Id { get; set; }

    public int JobServicesId { get; set; }

    public DateTime JsDate { get; set; }

    public string? JsTime { get; set; }

    public string? JsLocation { get; set; }

    public string? ClientName { get; set; }

    public string? ClientContact { get; set; }

    public string? ProviderName { get; set; }

    public string? ProviderContact { get; set; }

    public virtual JobService JobServices { get; set; } = null!;
}
