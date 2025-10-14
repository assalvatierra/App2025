using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarImage
{
    public int Id { get; set; }

    public int CarUnitId { get; set; }

    public string ImgUrl { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public string SysCode { get; set; } = null!;

    public virtual CarUnit CarUnit { get; set; } = null!;
}
