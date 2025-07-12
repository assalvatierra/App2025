using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AppointmentStatus
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
