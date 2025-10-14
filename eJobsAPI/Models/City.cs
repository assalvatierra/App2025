using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class City
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Branch> Branches { get; set; } = new List<Branch>();

    public virtual ICollection<CarDestination> CarDestinations { get; set; } = new List<CarDestination>();

    public virtual ICollection<Destination> Destinations { get; set; } = new List<Destination>();

    public virtual ICollection<Supplier> Suppliers { get; set; } = new List<Supplier>();
}
