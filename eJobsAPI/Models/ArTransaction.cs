using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ArTransaction
{
    public int Id { get; set; }

    public int InvoiceId { get; set; }

    public DateTime DtInvoice { get; set; }

    public string Description { get; set; } = null!;

    public DateTime DtEncoded { get; set; }

    public DateTime DtDue { get; set; }

    public decimal Amount { get; set; }

    public bool IsRepeating { get; set; }

    public string? Remarks { get; set; }

    public int ArTransStatusId { get; set; }

    public int ArAccountId { get; set; }

    public int ArCategoryId { get; set; }

    public DateTime DtService { get; set; }

    public DateTime? DtServiceTo { get; set; }

    public string? InvoiceRef { get; set; }

    public int ArAccContactId { get; set; }

    public virtual ArAccount ArAccount { get; set; } = null!;

    public virtual ICollection<ArAction> ArActions { get; set; } = new List<ArAction>();

    public virtual ArCategory ArCategory { get; set; } = null!;

    public virtual ICollection<ArTransDeposit> ArTransDeposits { get; set; } = new List<ArTransDeposit>();

    public virtual ICollection<ArTransPayment> ArTransPayments { get; set; } = new List<ArTransPayment>();

    public virtual ICollection<ArTransPost> ArTransPosts { get; set; } = new List<ArTransPost>();

    public virtual ICollection<ArTransRepeat> ArTransRepeats { get; set; } = new List<ArTransRepeat>();

    public virtual ArTransStatus ArTransStatus { get; set; } = null!;
}
