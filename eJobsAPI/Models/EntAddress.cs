using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class EntAddress
{
    public int Id { get; set; }

    public int EntCompanyId { get; set; }

    public int SysSetupTypeId { get; set; }

    public string Add1 { get; set; } = null!;

    public string Add2 { get; set; } = null!;

    public string Add3 { get; set; } = null!;

    public string Add4 { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public string Telno1 { get; set; } = null!;

    public string Telno2 { get; set; } = null!;

    public virtual EntBusiness EntCompany { get; set; } = null!;

    public virtual SysSetupType SysSetupType { get; set; } = null!;
}
