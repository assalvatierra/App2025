using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmProdCat
{
    public int Id { get; set; }

    public int SmCategoryId { get; set; }

    public int SmProductId { get; set; }

    public virtual SmCategory SmCategory { get; set; } = null!;

    public virtual SmProduct SmProduct { get; set; } = null!;
}
