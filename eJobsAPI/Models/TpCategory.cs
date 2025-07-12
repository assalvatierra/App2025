using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpCategory
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public string SysCode { get; set; } = null!;

    public virtual ICollection<TpProdCat> TpProdCats { get; set; } = new List<TpProdCat>();
}
