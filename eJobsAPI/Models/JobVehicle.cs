using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobVehicle
{
    public int Id { get; set; }

    public int VehicleId { get; set; }

    public int JobMainId { get; set; }

    public int Mileage { get; set; }

    public virtual JobMain JobMain { get; set; } = null!;

    public virtual Vehicle Vehicle { get; set; } = null!;
}
