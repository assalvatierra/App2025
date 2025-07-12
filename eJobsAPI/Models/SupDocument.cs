using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupDocument
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<CustEntDocument> CustEntDocuments { get; set; } = new List<CustEntDocument>();

    public virtual ICollection<SupplierDocument> SupplierDocuments { get; set; } = new List<SupplierDocument>();
}
