using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class AppointmentAcctType
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
