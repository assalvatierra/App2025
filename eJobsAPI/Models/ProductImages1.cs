using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ProductImages1
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string Path { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
