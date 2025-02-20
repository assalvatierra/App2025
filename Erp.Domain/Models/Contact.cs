using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Contact
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public string? ContactNo1 { get; set; }

    public string? ContactNo2 { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public string? Email1 { get; set; }

    public string? Email2 { get; set; }

    public int? CityId { get; set; }

    public string? CountryId { get; set; }

    public virtual ICollection<CustomerContact> CustomerContacts { get; set; } = new List<CustomerContact>();

    public virtual ICollection<SupplierContact> SupplierContacts { get; set; } = new List<SupplierContact>();
}
