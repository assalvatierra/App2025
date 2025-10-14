using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class EntContact
{
    public int Id { get; set; }

    public int EntCompanyId { get; set; }

    public int SysSetupTypeId { get; set; }

    public string Name { get; set; } = null!;

    public string Position { get; set; } = null!;

    public string TelNo1 { get; set; } = null!;

    public string TelNo2 { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public virtual EntBusiness EntCompany { get; set; } = null!;

    public virtual SysSetupType SysSetupType { get; set; } = null!;
}
