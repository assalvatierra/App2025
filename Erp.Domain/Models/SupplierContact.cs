using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class SupplierContact
{
    public int Id { get; set; }

    public int? SupplierId { get; set; }

    public int? ContactId { get; set; }

    public virtual Contact? Contact { get; set; }

    public virtual Supplier? Supplier { get; set; }
}
