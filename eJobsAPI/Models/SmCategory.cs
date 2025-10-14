using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<SmProdAd> SmProdAds { get; set; } = new List<SmProdAd>();

    public virtual ICollection<SmProdCat> SmProdCats { get; set; } = new List<SmProdCat>();
}
