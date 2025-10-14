using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArAccount
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Landline { get; set; }

    public string Email { get; set; } = null!;

    public string Mobile { get; set; } = null!;

    public string? Company { get; set; }

    public string? Address { get; set; }

    public string? Remarks { get; set; }

    public int ArAccStatusId { get; set; }

    public string? Landline2 { get; set; }

    public string? Mobile2 { get; set; }

    public virtual ICollection<ArAccContact> ArAccContacts { get; set; } = new List<ArAccContact>();

    public virtual ArAccStatus ArAccStatus { get; set; } = null!;

    public virtual ICollection<ArAccntCredit> ArAccntCredits { get; set; } = new List<ArAccntCredit>();

    public virtual ICollection<ArAccntTerm> ArAccntTerms { get; set; } = new List<ArAccntTerm>();

    public virtual ICollection<ArPayment> ArPayments { get; set; } = new List<ArPayment>();

    public virtual ICollection<ArTransaction> ArTransactions { get; set; } = new List<ArTransaction>();
}
