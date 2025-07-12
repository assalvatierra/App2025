using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class HrPerDoc
{
    public int Id { get; set; }

    public int HrPersonelId { get; set; }

    public string Description { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public virtual HrPersonel HrPersonel { get; set; } = null!;
}
