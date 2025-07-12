using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class EmailBlasterTemplate
{
    public int Id { get; set; }

    public string EmailCategory { get; set; } = null!;

    public string RecipientsCategory { get; set; } = null!;

    public string EmailTitle { get; set; } = null!;

    public string EmailBody { get; set; } = null!;

    public string? ContentPicture { get; set; }

    public string? AttachmentLink { get; set; }

    public string Company { get; set; } = null!;

    public virtual ICollection<BlasterLog> BlasterLogs { get; set; } = new List<BlasterLog>();
}
