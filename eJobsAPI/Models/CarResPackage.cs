using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CarResPackage
{
    public int Id { get; set; }

    public int CarRateUnitPackageId { get; set; }

    public int CarReservationId { get; set; }

    public int DrvMealByClient { get; set; }

    public int DrvRoomByClient { get; set; }

    public int FuelByClient { get; set; }

    public virtual CarRateUnitPackage CarRateUnitPackage { get; set; } = null!;

    public virtual CarReservation CarReservation { get; set; } = null!;
}
