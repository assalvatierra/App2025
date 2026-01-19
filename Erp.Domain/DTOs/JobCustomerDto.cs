using System;

namespace Erp.Domain.DTOs;

public class JobCustomerDto
{
    // JobCustomer Properties
    public int Id { get; set; }

    public int? JobMainId { get; set; }

    public int? CustomerId { get; set; }

    public bool IsPrimary { get; set; }

    public bool IsBillTo { get; set; }

    public string? Notes { get; set; }

    // Entity Properties (Customer)
    public string? CustomerName { get; set; }

    public string? CustomerDescription { get; set; }

    public string? CustomerRemarks { get; set; }

    public string? CustomerCode { get; set; }

    public int? CustomerSortOrder { get; set; }

    public string? CustomerContactNo1 { get; set; }

    public string? CustomerContactNo2 { get; set; }

    public string? CustomerAddress1 { get; set; }

    public string? CustomerAddress2 { get; set; }

    public string? CustomerEmail1 { get; set; }

    public string? CustomerEmail2 { get; set; }

    public string? CustomerCreatedBy { get; set; }

    public DateTime CustomerCreatedOn { get; set; }

    public string? CustomerLastEditBy { get; set; }

    public DateTime CustomerLastEditOn { get; set; }

    public bool CustomerIsArchived { get; set; }

    public bool CustomerIsPrivate { get; set; }

    public bool CustomerIsActive { get; set; }

    public int? CustomerEntityTypeId { get; set; }

    public int? CustomerEntityStatusId { get; set; }

    public int? CustomerBusinessUnitId { get; set; }

    public int? CustomerRefCityId { get; set; }
}
