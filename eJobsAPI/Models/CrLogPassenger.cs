using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CrLogPassenger
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Contact { get; set; }

    public string? PassAddress { get; set; }

    public string PickupPoint { get; set; } = null!;

    public string PickupTime { get; set; } = null!;

    public string DropPoint { get; set; } = null!;

    public string DropTime { get; set; } = null!;

    public string TimeContacted { get; set; } = null!;

    public string TimeBoarded { get; set; } = null!;

    public string TimeDelivered { get; set; } = null!;

    public string? Remarks { get; set; }

    public int CrLogPassStatusId { get; set; }

    public int CrLogTripId { get; set; }

    public string? Area { get; set; }

    public bool NextDay { get; set; }

    public string? RestDay { get; set; }

    public virtual CrLogPassStatus CrLogPassStatus { get; set; } = null!;

    public virtual CrLogTrip CrLogTrip { get; set; } = null!;
}
