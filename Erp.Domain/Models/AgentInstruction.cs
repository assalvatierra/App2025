using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class AgentInstruction
{
    public int Id { get; set; }

    public int? AgentId { get; set; }

    public string Title { get; set; } = null!;

    public string? Content { get; set; }

    public string? Keywords { get; set; }

    public int? OrderNo { get; set; }

    public virtual Agent? Agent { get; set; }
}
