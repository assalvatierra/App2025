using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AppointmentRequest
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public int? OrderNo { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
