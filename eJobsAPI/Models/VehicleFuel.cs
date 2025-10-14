using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class VehicleFuel
{
    public int Id { get; set; }

    public string Fuel { get; set; } = null!;

    public virtual ICollection<VehicleModel> VehicleModels { get; set; } = new List<VehicleModel>();
}
