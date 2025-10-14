using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogOdo
{
    public int Id { get; set; }

    public int CrLogUnitId { get; set; }

    public int CrLogDriverId { get; set; }

    public int OdoCurrent { get; set; }

    public DateTime DtReading { get; set; }

    public string? Remarks { get; set; }

    public virtual CrLogDriver CrLogDriver { get; set; } = null!;

    public virtual CrLogUnit CrLogUnit { get; set; } = null!;
}
