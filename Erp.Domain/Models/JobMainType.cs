using System;
using System.Collections.Generic;

namespace Erp.Domain.Models;

public partial class JobMainType
{
    public int Id { get; set; }

    public int? JobMainId { get; set; }

    public int? ItemTypeId { get; set; }
}
