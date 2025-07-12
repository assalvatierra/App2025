using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobPost
{
    public int Id { get; set; }

    public DateTime DtPost { get; set; }

    public decimal PaymentAmt { get; set; }

    public decimal ExpensesAmt { get; set; }

    public decimal CarRentalInc { get; set; }

    public decimal TourInc { get; set; }

    public decimal OthersInc { get; set; }

    public string Remarks { get; set; } = null!;

    public int JobMainId { get; set; }

    public virtual JobMain JobMain { get; set; } = null!;
}
