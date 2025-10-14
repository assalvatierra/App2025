using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpInqService
{
    public int Id { get; set; }

    public int TpInquiryId { get; set; }

    public int TpProductsId { get; set; }

    public DateTime DtSvcStart { get; set; }

    public string? Message { get; set; }

    public virtual TpInquiry TpInquiry { get; set; } = null!;

    public virtual TpProduct TpProducts { get; set; } = null!;
}
