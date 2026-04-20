using System;
using System.Collections.Generic;

namespace Erp.Domain.DTOs
{
    /// <summary>
    /// DTO representing a resource's calendar data for a specific date range
    /// </summary>
    public class ResourceCalendarDto
    {
        public int ResourceId { get; set; }
        public string ResourceName { get; set; } = string.Empty;
        public string ResourceCode { get; set; } = string.Empty;
        public List<CalendarDayDto> Days { get; set; } = new();
    }
    
    /// <summary>
    /// DTO representing a single day in the calendar with its entries
    /// </summary>
    public class CalendarDayDto
    {
        public DateTime Date { get; set; }
        public List<CalendarEntryDto> Entries { get; set; } = new();
    }
    
    /// <summary>
    /// DTO representing a single calendar entry (job assignment)
    /// </summary>
    public class CalendarEntryDto
    {
        public int Id { get; set; }
        public int JobServiceResourceId { get; set; }
        public int JobServiceId { get; set; }
        public int JobMainId { get; set; }
        public string? JobReference { get; set; }
        public string? CustomerName { get; set; }
        public string? Particulars { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public string? StatusName { get; set; }
        public string? StatusCode { get; set; }
        public decimal? QuotedAmt { get; set; }
        public decimal? SupplierAmt { get; set; }
    }
    
    /// <summary>
    /// DTO for calendar filter options
    /// </summary>
    public class CalendarFilterDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<int>? ResourceIds { get; set; }
        public List<int>? StatusIds { get; set; }
    }

    /// <summary>
    /// DTO representing a job with services for calendar display
    /// </summary>
    public class JobCalendarDto
    {
        public int JobMainId { get; set; }
        public string JobReference { get; set; } = string.Empty;
        public string? CustomerName { get; set; }
        public List<JobServiceCalendarDto> Services { get; set; } = new();
    }

    /// <summary>
    /// DTO representing a job service with resource requirements
    /// </summary>
    public class JobServiceCalendarDto
    {
        public int Id { get; set; }
        public int JobMainId { get; set; }
        public int? ServiceItemId { get; set; }
        public string? ServiceItemName { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public string? Particulars { get; set; }
        public List<ServiceRequirementDto> Requirements { get; set; } = new();
        public List<AssignedResourceDto> AssignedResources { get; set; } = new();
        public bool HasResourcesAssigned { get; set; }
    }

    /// <summary>
    /// DTO representing an assigned resource to a job service
    /// </summary>
    public class AssignedResourceDto
    {
        public int JobServiceResourceId { get; set; }
        public int ResourceId { get; set; }
        public string ResourceName { get; set; } = string.Empty;
        public string? ResourceCode { get; set; }
        public string ResourceType { get; set; } = "Other"; // Driver, Vehicle, Equipment, Other
    }

    /// <summary>
    /// DTO representing a single service requirement
    /// </summary>
    public class ServiceRequirementDto
    {
        public int Id { get; set; }
        public int RequiredQty { get; set; }
        public int? ItemTypeId { get; set; }
        public string? ItemTypeName { get; set; }
        public string ResourceType { get; set; } = "Other"; // Driver, Vehicle, Other
        public int AllocatedQuantity { get; set; }
        public string? Notes { get; set; }
    }
}
