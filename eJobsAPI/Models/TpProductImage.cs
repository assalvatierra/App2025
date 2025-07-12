using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpProductImage
{
    public int Id { get; set; }

    public int TpProductsId { get; set; }

    public string ImgPath { get; set; } = null!;

    public string? Desc { get; set; }

    public string? AltName { get; set; }

    public int Sort { get; set; }

    public virtual TpProduct TpProducts { get; set; } = null!;
}
