using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustFile
{
    public int Id { get; set; }

    public string Desc { get; set; } = null!;

    public string Folder { get; set; } = null!;

    public string Path { get; set; } = null!;

    public string? Remarks { get; set; }

    public int CustomerId { get; set; }

    public virtual ICollection<CustFileRef> CustFileRefs { get; set; } = new List<CustFileRef>();
}
