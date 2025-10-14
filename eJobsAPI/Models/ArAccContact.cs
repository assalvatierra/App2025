using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArAccContact
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Mobile { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Position { get; set; }

    public int ArAccountId { get; set; }

    public virtual ArAccount ArAccount { get; set; } = null!;
}
