using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustCat
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int CustCategoryId { get; set; }

    public virtual CustCategory CustCategory { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;
}
