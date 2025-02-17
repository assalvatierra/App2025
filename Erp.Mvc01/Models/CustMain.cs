using System;
using System.Collections.Generic;

namespace Erp.Mvc01.Models;

public partial class CustMain
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Remarks { get; set; }

    public DateTime? DtCreated { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? DtEdited { get; set; }

    public string? EditedBy { get; set; }

    public bool? IsActive { get; set; }

    public int? RecordOrder { get; set; }

    public int? CustStatusId { get; set; }

    public virtual CustStatus? CustStatus { get; set; }
}
