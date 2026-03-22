using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobServiceTimesheet
{
    public int Id { get; set; }

    public int? TimesheetId { get; set; }

    public int? JobServiceId { get; set; }
}
