using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpProduct
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? ShortRemarks { get; set; }

    public string? PageView { get; set; }

    public string? PgFeatureImg { get; set; }

    public int Sort { get; set; }

    public int TpAreasId { get; set; }

    public virtual TpArea TpAreas { get; set; } = null!;

    public virtual ICollection<TpInqService> TpInqServices { get; set; } = new List<TpInqService>();

    public virtual ICollection<TpProdCat> TpProdCats { get; set; } = new List<TpProdCat>();

    public virtual ICollection<TpProdRate> TpProdRates { get; set; } = new List<TpProdRate>();

    public virtual ICollection<TpProductDesc> TpProductDescs { get; set; } = new List<TpProductDesc>();

    public virtual ICollection<TpProductImage> TpProductImages { get; set; } = new List<TpProductImage>();
}
