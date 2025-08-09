using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class AgentTask
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? MonitoredBy { get; set; }

    public string? PerformedBy { get; set; }

    public string? Occurence { get; set; }

    public DateTime? DueDate { get; set; }

    public DateTime? ScheduleDate { get; set; }

    public string? NextReminder { get; set; }

    public string? OtherInfo { get; set; }

    public int? AgentTaskStatusId { get; set; }

    public virtual AgentTaskStatus? AgentTaskStatus { get; set; }
}
