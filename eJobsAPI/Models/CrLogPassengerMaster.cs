using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogPassengerMaster
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Contact { get; set; } = null!;

    public string? PassAddress { get; set; }

    public string PickupPoint { get; set; } = null!;

    public string PickupTime { get; set; } = null!;

    public string DropPoint { get; set; } = null!;

    public string DropTime { get; set; } = null!;

    public string? Remarks { get; set; }

    public string? RestDays { get; set; }

    public string? Area { get; set; }

    public bool NextDay { get; set; }
}
