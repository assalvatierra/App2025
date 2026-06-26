using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobServiceResource
{
    public int Id { get; set; }
    public int? ResourceQty { get; set; }

    public int? JobServiceId { get; set; }

    public int? ResourceId { get; set; }

    public virtual JobService? JobService { get; set; }

    public virtual Resource? Resource { get; set; }
}
