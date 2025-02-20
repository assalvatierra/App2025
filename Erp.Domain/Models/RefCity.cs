using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Erp.Domain.Models;

[Table("RefCity")]
public partial class RefCity
{
    [Key]
    [StringLength(4000)]
    public string Id { get; set; } = null!;

    [StringLength(4000)]
    public string Name { get; set; } = null!;

    public int? RefCountryId { get; set; }

    [ForeignKey("RefCountryId")]
    [InverseProperty("RefCities")]
    public virtual RefCountry? RefCountry { get; set; }
}
