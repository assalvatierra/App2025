using System;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.DTOs
{
    /// <summary>
    /// Data Transfer Object for creating a new Payment.
    /// Excludes server-managed fields like CreatedBy, CreatedOn, etc.
    /// </summary>
    public class CreatePaymentDto
    {
        [Required]
        public DateTime TrxDate { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public string? Remarks { get; set; }

        public bool IsArchived { get; set; } = false;

        public bool IsPrivate { get; set; } = false;

        public bool IsActive { get; set; } = true;

        public int? EntityId { get; set; }

        public int? ItemTypeId { get; set; }

        public int? ItemStatusId { get; set; }

        public string? AdditionalInfo { get; set; }

        // Navigation properties for linking
        public List<CreateReceivablePaymentDto>? ReceivablePayments { get; set; }
        
        public List<CreateExpensePaymentDto>? ExpensePayments { get; set; }
    }

    public class CreateReceivablePaymentDto
    {
        public int? ReceivablesId { get; set; }
    }

    public class CreateExpensePaymentDto
    {
        public int? ExpensesId { get; set; }
    }
}
