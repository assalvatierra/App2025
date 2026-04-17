using System;

namespace Erp.Domain.DTOs;

public class JobContactDto
{
    // JobContact Properties
    public int Id { get; set; }

    public int? JobMainId { get; set; }

    public int? ContactId { get; set; }

    public bool IsPrimary { get; set; }

    public string? Notes { get; set; }

    // Contact navigation properties
    public string? ContactName { get; set; }
    public string? ContactNo1 { get; set; }
    public string? ContactNo2 { get; set; }
    public string? ContactEmail1 { get; set; }
    public string? ContactEmail2 { get; set; }
}
