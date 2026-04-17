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
}
