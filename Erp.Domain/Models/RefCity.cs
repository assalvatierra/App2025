using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class RefCity
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int? RefCountryId { get; set; }

    public virtual RefCountry? RefCountry { get; set; }
}
