using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class Appointment
{
    public int Id { get; set; }

    public DateTime DtEntered { get; set; }

    public string Customer { get; set; } = null!;

    public string Contact { get; set; } = null!;

    public string? CustCode { get; set; }

    public string Plate { get; set; } = null!;

    public string? Conduction { get; set; }

    public string Request { get; set; } = null!;

    public string? Remarks { get; set; }

    public int AppointmentStatusId { get; set; }

    public int AppointmentSlotId { get; set; }

    public string AppointmentDate { get; set; } = null!;

    public string? Unit { get; set; }

    public int AppointmentAcctTypeId { get; set; }

    public int AppointmentRequestId { get; set; }

    public virtual AppointmentAcctType AppointmentAcctType { get; set; } = null!;

    public virtual AppointmentRequest AppointmentRequest { get; set; } = null!;

    public virtual AppointmentSlot AppointmentSlot { get; set; } = null!;

    public virtual AppointmentStatus AppointmentStatus { get; set; } = null!;
}
