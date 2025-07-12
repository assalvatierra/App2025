using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AdminEmail
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string AccCode { get; set; } = null!;

    public string Remarks { get; set; } = null!;
}
