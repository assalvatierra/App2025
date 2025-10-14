using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntDocument
{
    public int Id { get; set; }

    public int SupDocumentId { get; set; }

    public int CustEntMainId { get; set; }

    public int? IsApproved { get; set; }

    public virtual CustEntMain CustEntMain { get; set; } = null!;

    public virtual SupDocument SupDocument { get; set; } = null!;
}
