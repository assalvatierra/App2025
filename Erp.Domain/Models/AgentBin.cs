using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class AgentBin
{
    public int Id { get; set; }

    public int? AgentId { get; set; }

    public string? Data { get; set; }

    public string? Status { get; set; }

    public DateTime DtAdded { get; set; }

    public int? orderNo { get; set; }
    
    public virtual Agent? Agent { get; set; }
}
