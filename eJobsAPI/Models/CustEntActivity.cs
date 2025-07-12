using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntActivity
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public string Assigned { get; set; } = null!;

    public string? ProjectName { get; set; }

    public string? SalesCode { get; set; }

    public decimal? Amount { get; set; }

    public string Status { get; set; } = null!;

    public string? Remarks { get; set; }

    public int CustEntMainId { get; set; }

    public string? Type { get; set; }

    public string? ActivityType { get; set; }

    public int? SalesLeadId { get; set; }

    public int? CustEntActStatusId { get; set; }

    public int? CustEntActActionStatusId { get; set; }

    public int? CustEntActActionCodesId { get; set; }

    public string? Commodity { get; set; }

    public virtual CustEntActActionCode? CustEntActActionCodes { get; set; }

    public virtual CustEntActActionStatus? CustEntActActionStatus { get; set; }

    public virtual CustEntMain CustEntMain { get; set; } = null!;
}
