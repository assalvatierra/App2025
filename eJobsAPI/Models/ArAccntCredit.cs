using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArAccntCredit
{
    public int Id { get; set; }

    public int ArAccountId { get; set; }

    public DateTime DtCredit { get; set; }

    public decimal CreditLimit { get; set; }

    public decimal OverLimitAllowed { get; set; }

    public decimal CreditWarning { get; set; }

    public string? ApprovedBy { get; set; }

    public int ArCreditStatusId { get; set; }

    public virtual ArAccount ArAccount { get; set; } = null!;

    public virtual ArCreditStatus ArCreditStatus { get; set; } = null!;
}
