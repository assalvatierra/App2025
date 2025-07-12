using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpProdCat
{
    public int Id { get; set; }

    public int TpCategoryId { get; set; }

    public int TpProductsId { get; set; }

    public virtual TpCategory TpCategory { get; set; } = null!;

    public virtual TpProduct TpProducts { get; set; } = null!;
}
