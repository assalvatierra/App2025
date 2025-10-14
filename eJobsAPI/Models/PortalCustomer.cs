using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class PortalCustomer
{
    public int Id { get; set; }

    public string ContactNum { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime ExpiryDt { get; set; }

    public int CustomerId { get; set; }
}
