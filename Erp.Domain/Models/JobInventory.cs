using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobInventory
{
    public int Id { get; set; }

    public int? JobMainId { get; set; }

    public string Particulars { get; set; } = null!;

    public int? InvItemsId { get; set; }

    public decimal QtyRequired { get; set; }

    public virtual JobMain? JobMain { get; set; }
}
