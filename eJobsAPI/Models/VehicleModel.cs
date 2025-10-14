using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class VehicleModel
{
    public int Id { get; set; }

    public string Make { get; set; } = null!;

    public string Variant { get; set; } = null!;

    public int VehicleBrandId { get; set; }

    public int VehicleTypeId { get; set; }

    public string? Remarks { get; set; }

    public int VehicleTransmissionId { get; set; }

    public int VehicleFuelId { get; set; }

    public int VehicleDriveId { get; set; }

    public string? MotorOil { get; set; }

    public string? GearOil { get; set; }

    public string? TransmissionOil { get; set; }

    public virtual VehicleBrand VehicleBrand { get; set; } = null!;

    public virtual VehicleDrife VehicleDrive { get; set; } = null!;

    public virtual VehicleFuel VehicleFuel { get; set; } = null!;

    public virtual VehicleTransmission VehicleTransmission { get; set; } = null!;

    public virtual VehicleType VehicleType { get; set; } = null!;

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
