using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SrvActionCode
{
    public int Id { get; set; }

    public string CatCode { get; set; } = null!;

    public int SortNo { get; set; }
}
