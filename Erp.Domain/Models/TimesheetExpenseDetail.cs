using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Erp.Domain.Models;

[Table("TimesheetExpenseDetail")]
public partial class TimesheetExpenseDetail
{
    [Key]
    public int Id { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? BillAmount { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? AdditionalBillAmount { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? ResourceRate { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? AdditionalRate { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? ResourceRate1 { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? AdditionalRate1 { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? RegularExpense { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? OtherExpense { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? Discount { get; set; }

    [StringLength(4000)]
    public string? AmountRemarks { get; set; }
}
