using System;
using System.Collections.Generic;

namespace Erp.Mvc01.Models;

public partial class Customer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Remarks { get; set; } = null!;
}
