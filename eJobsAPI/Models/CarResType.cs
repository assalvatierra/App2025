using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarResType
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<CarReservation> CarReservations { get; set; } = new List<CarReservation>();
}
