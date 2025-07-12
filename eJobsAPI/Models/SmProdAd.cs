using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmProdAd
{
    public int Id { get; set; }

    public string Image { get; set; } = null!;

    public string Link { get; set; } = null!;

    public int SmCategoryId { get; set; }

    public int SmProductId { get; set; }

    public virtual SmCategory SmCategory { get; set; } = null!;

    public virtual SmProduct SmProduct { get; set; } = null!;
}
