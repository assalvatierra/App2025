using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class RsvPayment
{
    public int Id { get; set; }

    public DateTime DtPayment { get; set; }

    public string Status { get; set; } = null!;

    public decimal Amount { get; set; }

    public string PaypaPaymentId { get; set; } = null!;

    public int OnlineReservationId { get; set; }

    public virtual OnlineReservation OnlineReservation { get; set; } = null!;
}
