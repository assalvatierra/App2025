using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarDestination
{
    public int Id { get; set; }

    public int CityId { get; set; }

    public string Description { get; set; } = null!;

    public int Kms { get; set; }

    public virtual City City { get; set; } = null!;
}
