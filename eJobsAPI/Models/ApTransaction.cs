using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class ApTransaction
{
    public int Id { get; set; }

    public string? InvoiceNo { get; set; }

    public DateTime DtInvoice { get; set; }

    public DateTime DtEncoded { get; set; }

    public string Description { get; set; } = null!;

    public decimal Amount { get; set; }

    public bool IsRepeating { get; set; }

    public int? RepeatCount { get; set; }

    public int? RepeatNo { get; set; }

    public int? Interval { get; set; }

    public DateTime DtDue { get; set; }

    public DateTime DtService { get; set; }

    public DateTime DtServiceTo { get; set; }

    public string? Remarks { get; set; }

    public int ApAccountId { get; set; }

    public int ApTransStatusId { get; set; }

    public int ApTransCategoryId { get; set; }

    public int? NextRef { get; set; }

    public int? PrevRef { get; set; }

    public bool IsPrinted { get; set; }

    public decimal? BudgetAmt { get; set; }

    public decimal? ReleaseAmt { get; set; }

    public DateTime? DtRelease { get; set; }

    public int? JobRef { get; set; }

    public int ApTransTypeId { get; set; }

    public bool? IsFunded { get; set; }

    public virtual ApAccount ApAccount { get; set; } = null!;

    public virtual ICollection<ApAction> ApActions { get; set; } = new List<ApAction>();

    public virtual ApTransCategory ApTransCategory { get; set; } = null!;

    public virtual ICollection<ApTransItem> ApTransItems { get; set; } = new List<ApTransItem>();

    public virtual ICollection<ApTransPayment> ApTransPayments { get; set; } = new List<ApTransPayment>();

    public virtual ICollection<ApTransPrintReq> ApTransPrintReqs { get; set; } = new List<ApTransPrintReq>();

    public virtual ICollection<ApTransRepeat> ApTransRepeats { get; set; } = new List<ApTransRepeat>();

    public virtual ApTransStatus ApTransStatus { get; set; } = null!;

    public virtual ApTransType ApTransType { get; set; } = null!;
}
