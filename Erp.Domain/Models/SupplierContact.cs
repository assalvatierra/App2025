using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Erp.Domain.Models;

[Table("Supplier_Contact")]
public partial class SupplierContact
{
    [Key]
    public int Id { get; set; }

    public int? SupplierId { get; set; }

    public int? ContactId { get; set; }

    //public virtual Contact? Contact { get; set; }

    //public virtual Supplier? Supplier { get; set; }
}
