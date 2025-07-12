using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ProductCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public virtual ICollection<ProductProdCat> ProductProdCats { get; set; } = new List<ProductProdCat>();
}
