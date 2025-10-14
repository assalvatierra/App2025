using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Vehicle
{
    public int Id { get; set; }

    public int VehicleModelId { get; set; }

    public string YearModel { get; set; } = null!;

    public string PlateNo { get; set; } = null!;

    public string? Conduction { get; set; }

    public string? EngineNo { get; set; }

    public string? ChassisNo { get; set; }

    public string? Color { get; set; }

    public int CustomerId { get; set; }

    public int CustEntMainId { get; set; }

    public string? Remarks { get; set; }

    public virtual CustEntMain CustEntMain { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;

    public virtual ICollection<JobVehicle> JobVehicles { get; set; } = new List<JobVehicle>();

    public virtual VehicleModel VehicleModel { get; set; } = null!;
}
