using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ProductProdCat
{
    public int Id { get; set; }

    public int ProductCategoryId { get; set; }

    public int ProductId { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual ProductCategory ProductCategory { get; set; } = null!;
}
