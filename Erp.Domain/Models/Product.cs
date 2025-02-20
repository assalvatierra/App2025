using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Erp.Domain.Models;

[Table("Product")]
public partial class Product
{
    [StringLength(4000)]
    public string Name { get; set; } = null!;

    [StringLength(4000)]
    public string? Remarks { get; set; }

    [StringLength(4000)]
    public string? Code { get; set; }

    [Key]
    public int Id { get; set; }
}
