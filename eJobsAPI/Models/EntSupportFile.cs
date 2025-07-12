using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class EntSupportFile
{
    public int Id { get; set; }

    public int SysFileTypeId { get; set; }

    public int EntCompanyId { get; set; }

    public string UrlPath { get; set; } = null!;

    public virtual EntBusiness EntCompany { get; set; } = null!;

    public virtual SysSetupType SysFileType { get; set; } = null!;
}
