using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustSalesCategory
{
    public int Id { get; set; }

    public int SalesLeadCatCodeId { get; set; }

    public int CustomerId { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual SalesLeadCatCode SalesLeadCatCode { get; set; } = null!;
}
