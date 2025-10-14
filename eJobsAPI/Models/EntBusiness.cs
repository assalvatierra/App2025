using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class EntBusiness
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string ShortName { get; set; } = null!;

    public string BussRegNo { get; set; } = null!;

    public string User { get; set; } = null!;

    public virtual ICollection<EntAddress> EntAddresses { get; set; } = new List<EntAddress>();

    public virtual ICollection<EntContact> EntContacts { get; set; } = new List<EntContact>();

    public virtual ICollection<EntService> EntServices { get; set; } = new List<EntService>();

    public virtual ICollection<EntSetting> EntSettings { get; set; } = new List<EntSetting>();

    public virtual ICollection<EntSupportFile> EntSupportFiles { get; set; } = new List<EntSupportFile>();
}
