using System;
using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.DTOs
{
    /// <summary>
    /// Data Transfer Object for updating an existing Payment.
    /// Excludes server-managed fields like CreatedBy, CreatedOn, LastEditBy, LastEditOn.
    /// </summary>
    public class UpdatePaymentDto
    {
        [Required]
        public int Id { get; set; }

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

        public List<UpdateReceivablePaymentDto>? ReceivablePayments { get; set; }

        public List<UpdateExpensePaymentDto>? ExpensePayments { get; set; }
    }

    public class UpdateReceivablePaymentDto
    {
        public int? Id { get; set; }
        public int? ReceivablesId { get; set; }
        public int? PaymentsId { get; set; }
    }

    public class UpdateExpensePaymentDto
    {
        public int? Id { get; set; }
        public int? ExpensesId { get; set; }
        public int? PaymentsId { get; set; }
    }
}
