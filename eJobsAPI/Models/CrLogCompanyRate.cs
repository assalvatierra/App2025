using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogCompanyRate
{
    public int Id { get; set; }

    public decimal TripRate { get; set; }

    public decimal Otrate { get; set; }

    public int TripHours { get; set; }

    public decimal DriverDailyRate { get; set; }

    public decimal DriverOtrate { get; set; }

    public int CrLogCompanyId { get; set; }

    public virtual CrLogCompany CrLogCompany { get; set; } = null!;
}
