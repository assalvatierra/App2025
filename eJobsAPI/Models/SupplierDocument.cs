using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierDocument
{
    public int Id { get; set; }

    public int SupplierId { get; set; }

    public int SupDocumentId { get; set; }

    public virtual SupDocument SupDocument { get; set; } = null!;

    public virtual Supplier Supplier { get; set; } = null!;
}
