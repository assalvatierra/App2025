using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class TpProductDesc
{
    public int Id { get; set; }

    public int TpProductsId { get; set; }

    public string? TpDescH1 { get; set; }

    public string? TpDescH2 { get; set; }

    public string? TpDesc { get; set; }

    public int Sort { get; set; }

    public virtual TpProduct TpProducts { get; set; } = null!;
}
