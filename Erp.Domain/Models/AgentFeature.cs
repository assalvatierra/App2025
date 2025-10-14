using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class AgentFeature
{
    public int Id { get; set; }

    public int? AgentId { get; set; }

    public string Code { get; set; } = null!;

    public string? Options { get; set; }

    public virtual Agent? Agent { get; set; }
}
