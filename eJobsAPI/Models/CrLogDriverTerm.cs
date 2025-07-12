using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogDriverTerm
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public int CrLogDriverId { get; set; }

    public DateTime Date { get; set; }

    public virtual CrLogDriver CrLogDriver { get; set; } = null!;
}
