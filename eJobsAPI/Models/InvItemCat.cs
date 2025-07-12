using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvItemCat
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public string? ImgPath { get; set; }

    public string? SysCode { get; set; }

    public virtual ICollection<InvItemCategory> InvItemCategories { get; set; } = new List<InvItemCategory>();
}
