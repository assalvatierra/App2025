using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobContact
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? ShortName { get; set; }

    public string? Company { get; set; }

    public string? Position { get; set; }

    public string? Tel1 { get; set; }

    public string? Tel2 { get; set; }

    public string? Email { get; set; }

    public string? AddInfo { get; set; }

    public string? Remarks { get; set; }

    public string? ContactType { get; set; }
}
