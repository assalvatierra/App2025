using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SalesActivity
{
    public int Id { get; set; }

    public int SalesLeadId { get; set; }

    public int SalesActCodeId { get; set; }

    public string Particulars { get; set; } = null!;

    public DateTime DtActivity { get; set; }

    public int SalesActStatusId { get; set; }

    public DateTime DtEntered { get; set; }

    public string EnteredBy { get; set; } = null!;

    public virtual SalesActCode SalesActCode { get; set; } = null!;

    public virtual SalesActStatus SalesActStatus { get; set; } = null!;

    public virtual SalesLead SalesLead { get; set; } = null!;
}
