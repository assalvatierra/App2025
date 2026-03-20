using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobTimesheet
{
    public int Id { get; set; }

    public int? TimesheetId { get; set; }

    public int? JobMainId { get; set; }

    public virtual Timesheet? Timesheet { get; set; }
}
