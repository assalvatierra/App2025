using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustSocialAcc
{
    public int Id { get; set; }

    public string Facebook { get; set; } = null!;

    public string Viber { get; set; } = null!;

    public string Skype { get; set; } = null!;

    public int CustomerId { get; set; }

    public virtual Customer Customer { get; set; } = null!;
}
