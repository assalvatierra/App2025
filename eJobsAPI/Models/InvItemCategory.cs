using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvItemCategory
{
    public int Id { get; set; }

    public int InvItemCatId { get; set; }

    public int InvItemId { get; set; }

    public virtual InvItem InvItem { get; set; } = null!;

    public virtual InvItemCat InvItemCat { get; set; } = null!;
}
