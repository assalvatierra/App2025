using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Erp.Domain.Models;

[Table("Contact")]
public partial class Contact
{
    [Key]
    public int Id { get; set; }

    [StringLength(4000)]
    public string Name { get; set; } = null!;

    [StringLength(4000)]
    public string? Remarks { get; set; }

    [StringLength(4000)]
    public string? ContactNo1 { get; set; }

    [StringLength(4000)]
    public string? ContactNo2 { get; set; }

    [StringLength(4000)]
    public string? Address1 { get; set; }

    [StringLength(4000)]
    public string? Address2 { get; set; }

    [StringLength(4000)]
    public string? Email1 { get; set; }

    [StringLength(4000)]
    public string? Email2 { get; set; }

    public int? CityId { get; set; }

    [StringLength(4000)]
    public string? CountryId { get; set; }

    [StringLength(4000)]
    public string CreatedBy { get; set; } = null!;

    public DateTime CreatedOn { get; set; }

    [StringLength(4000)]
    public string LastEditBy { get; set; } = null!;

    public DateTime LastEditOn { get; set; }

    [Column("isArchived")]
    public bool IsArchived { get; set; }

    [Column("isPrivate")]
    public bool IsPrivate { get; set; }

    [Column("isActive")]
    public bool IsActive { get; set; }

    [InverseProperty("Contact")]
    public virtual ICollection<CustomerContact> CustomerContacts { get; set; } = new List<CustomerContact>();

    [InverseProperty("Contact")]
    public virtual ICollection<SupplierContact> SupplierContacts { get; set; } = new List<SupplierContact>();
}
