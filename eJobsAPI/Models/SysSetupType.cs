using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SysSetupType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public string SysCode { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public string Status { get; set; } = null!;

    public virtual ICollection<EntAddress> EntAddresses { get; set; } = new List<EntAddress>();

    public virtual ICollection<EntContact> EntContacts { get; set; } = new List<EntContact>();

    public virtual ICollection<EntSetting> EntSettings { get; set; } = new List<EntSetting>();

    public virtual ICollection<EntSupportFile> EntSupportFiles { get; set; } = new List<EntSupportFile>();
}
