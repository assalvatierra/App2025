using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class RefCity
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public string? Code { get; set; }

    public int? SortOrder { get; set; }

    public int? CountryId { get; set; }

    public int? RefCountryId { get; set; }

    public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();

    public virtual ICollection<Entity> Entities { get; set; } = new List<Entity>();

    public virtual RefCountry? RefCountry { get; set; }
}
