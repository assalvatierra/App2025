using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierActActionCode
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Desc { get; set; } = null!;

    public string SysCode { get; set; } = null!;

    public string IconPath { get; set; } = null!;

    public int DefaultActStatus { get; set; }

    public int? SeqNo { get; set; }
}
