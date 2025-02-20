using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class RefCountry
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<RefCity> RefCities { get; set; } = new List<RefCity>();
}
