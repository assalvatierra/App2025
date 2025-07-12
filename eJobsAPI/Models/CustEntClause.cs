using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntClause
{
    public int Id { get; set; }

    public int CustEntMainId { get; set; }

    public string Title { get; set; } = null!;

    public DateTime ValidStart { get; set; }

    public DateTime ValidEnd { get; set; }

    public string? Desc1 { get; set; }

    public string? Desc2 { get; set; }

    public string? Desc3 { get; set; }

    public DateTime DtEncoded { get; set; }

    public string EncodedBy { get; set; } = null!;

    public virtual CustEntMain CustEntMain { get; set; } = null!;
}
