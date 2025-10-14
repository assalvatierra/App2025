using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class VehicleDrife
{
    public int Id { get; set; }

    public string Drive { get; set; } = null!;

    public virtual ICollection<VehicleModel> VehicleModels { get; set; } = new List<VehicleModel>();
}
