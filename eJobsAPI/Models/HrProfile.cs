using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrProfile
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public string? Mobile1 { get; set; }

    public string? Mobile2 { get; set; }

    public string? Email { get; set; }

    public string? FbAccount { get; set; }

    public string? PresentAddress { get; set; }

    public string? ProvincialAddress { get; set; }

    public string? Spouse { get; set; }

    public int HrPersonelId { get; set; }

    public virtual HrPersonel HrPersonel { get; set; } = null!;
}
