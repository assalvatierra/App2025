using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class VehicleBrand
{
    public int Id { get; set; }

    public string Brand { get; set; } = null!;

    public virtual ICollection<VehicleModel> VehicleModels { get; set; } = new List<VehicleModel>();
}
