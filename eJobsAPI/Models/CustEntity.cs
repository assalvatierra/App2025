using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntity
{
    public int Id { get; set; }

    public int CustEntMainId { get; set; }

    public int CustomerId { get; set; }

    public string? Position { get; set; }

    public int CustAssocTypeId { get; set; }

    public string? Company { get; set; }

    public virtual CustEntMain CustEntMain { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;
}
