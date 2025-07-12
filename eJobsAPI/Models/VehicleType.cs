using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class VehicleType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<VehicleModel> VehicleModels { get; set; } = new List<VehicleModel>();
}
