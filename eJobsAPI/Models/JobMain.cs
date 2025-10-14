using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class JobMain
{
    public int Id { get; set; }

    public DateTime JobDate { get; set; }

    public int CustomerId { get; set; }

    public string Description { get; set; } = null!;

    public int NoOfPax { get; set; }

    public int NoOfDays { get; set; }

    public string? JobRemarks { get; set; }

    public int JobStatusId { get; set; }

    public string? StatusRemarks { get; set; }

    public int BranchId { get; set; }

    public int JobThruId { get; set; }

    public decimal? AgreedAmt { get; set; }

    public string? CustContactEmail { get; set; }

    public string? CustContactNumber { get; set; }

    public string? AssignedTo { get; set; }

    public DateTime? DueDate { get; set; }

    public virtual Branch Branch { get; set; } = null!;

    public virtual ICollection<CashExpense> CashExpenses { get; set; } = new List<CashExpense>();

    public virtual Customer Customer { get; set; } = null!;

    public virtual ICollection<JobItinerary> JobItineraries { get; set; } = new List<JobItinerary>();

    public virtual ICollection<JobNote> JobNotes { get; set; } = new List<JobNote>();

    public virtual ICollection<JobPayment> JobPayments { get; set; } = new List<JobPayment>();

    public virtual ICollection<JobPickup> JobPickups { get; set; } = new List<JobPickup>();

    public virtual ICollection<JobPost> JobPosts { get; set; } = new List<JobPost>();

    public virtual ICollection<JobService> JobServices { get; set; } = new List<JobService>();

    public virtual JobStatus JobStatus { get; set; } = null!;

    public virtual JobThru JobThru { get; set; } = null!;

    public virtual ICollection<JobType> JobTypes { get; set; } = new List<JobType>();

    public virtual ICollection<JobVehicle> JobVehicles { get; set; } = new List<JobVehicle>();

    public virtual ICollection<SalesLeadLink> SalesLeadLinks { get; set; } = new List<SalesLeadLink>();
}
