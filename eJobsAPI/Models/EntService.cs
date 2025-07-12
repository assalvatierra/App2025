using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class EntService
{
    public int Id { get; set; }

    public int SysServiceId { get; set; }

    public int EntCompanyId { get; set; }

    public DateTime Expiry { get; set; }

    public virtual EntBusiness EntCompany { get; set; } = null!;

    public virtual SysService SysService { get; set; } = null!;
}
