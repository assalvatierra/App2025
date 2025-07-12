using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierPoHdr
{
    public int Id { get; set; }

    public DateTime PoDate { get; set; }

    public string? Remarks { get; set; }

    public int SupplierId { get; set; }

    public int SupplierPoStatusId { get; set; }

    public string RequestBy { get; set; } = null!;

    public DateTime DtRequest { get; set; }

    public string? ApprovedBy { get; set; }

    public DateTime? DtApproved { get; set; }
}
