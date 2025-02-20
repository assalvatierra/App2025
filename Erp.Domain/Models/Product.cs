using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Product
{
    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public string? Code { get; set; }

    public int Id { get; set; }
}
