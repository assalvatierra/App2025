using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? IconPath { get; set; }

    public virtual ICollection<CustCat> CustCats { get; set; } = new List<CustCat>();

    public virtual ICollection<CustEntCat> CustEntCats { get; set; } = new List<CustEntCat>();
}
