using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class OnlineReservation
{
    public int Id { get; set; }

    public DateTime DtPosted { get; set; }

    public string ProductCode { get; set; } = null!;

    public DateTime DtStart { get; set; }

    public string Name { get; set; } = null!;

    public string ContactNum { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int Qty { get; set; }

    public string PickupDtls { get; set; } = null!;

    public decimal? PaymentAmt { get; set; }

    public virtual ICollection<RsvPayment> RsvPayments { get; set; } = new List<RsvPayment>();
}
