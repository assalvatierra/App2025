using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Product
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public int? TemplateId { get; set; }

    public string Description { get; set; } = null!;

    public string? Remarks { get; set; }

    public int Sort { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<ProductCondition> ProductConditions { get; set; } = new List<ProductCondition>();

    public virtual ICollection<ProductImages1> ProductImages1s { get; set; } = new List<ProductImages1>();

    public virtual ICollection<ProductPrice> ProductPrices { get; set; } = new List<ProductPrice>();

    public virtual ICollection<ProductProdCat> ProductProdCats { get; set; } = new List<ProductProdCat>();
}
