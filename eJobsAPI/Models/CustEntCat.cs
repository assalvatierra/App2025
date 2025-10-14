using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntCat
{
    public int Id { get; set; }

    public int CustEntMainId { get; set; }

    public int CustCategoryId { get; set; }

    public virtual CustCategory CustCategory { get; set; } = null!;

    public virtual CustEntMain CustEntMain { get; set; } = null!;
}
