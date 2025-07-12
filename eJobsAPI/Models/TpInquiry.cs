using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpInquiry
{
    public int Id { get; set; }

    public DateTime DtInquiry { get; set; }

    public string LeadGuest { get; set; } = null!;

    public string? ContactNo { get; set; }

    public string? Email { get; set; }

    public int NoOfChild { get; set; }

    public int NoOfAdult { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<TpInqService> TpInqServices { get; set; } = new List<TpInqService>();
}
