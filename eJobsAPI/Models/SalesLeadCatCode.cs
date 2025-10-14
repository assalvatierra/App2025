using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesLeadCatCode
{
    public int Id { get; set; }

    public string CatName { get; set; } = null!;

    public string SysCode { get; set; } = null!;

    public string? IconPath { get; set; }

    public virtual ICollection<CustSalesCategory> CustSalesCategories { get; set; } = new List<CustSalesCategory>();

    public virtual ICollection<SalesLeadCategory> SalesLeadCategories { get; set; } = new List<SalesLeadCategory>();
}
