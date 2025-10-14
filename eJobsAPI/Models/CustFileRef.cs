using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustFileRef
{
    public int Id { get; set; }

    public string RefTable { get; set; } = null!;

    public int RefId { get; set; }

    public int CustFilesId { get; set; }

    public virtual CustFile CustFiles { get; set; } = null!;
}
