using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class Customer
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

    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    public bool IsArchived { get; set; }

    public bool IsPrivate { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<CustomerContact> CustomerContacts { get; set; } = new List<CustomerContact>();
}
