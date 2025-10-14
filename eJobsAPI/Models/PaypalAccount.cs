using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class PaypalAccount
{
    public int Id { get; set; }

    public string SysCode { get; set; } = null!;

    public string Key { get; set; } = null!;

    public string Secret { get; set; } = null!;
}
