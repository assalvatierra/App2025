using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SmProduct
{
    public int Id { get; set; }

    public int SmBranchId { get; set; }

    public string? Code { get; set; }

    public string Name { get; set; } = null!;

    public string? Remarks { get; set; }

    public int BranchId { get; set; }

    public int ProdStatusId { get; set; }

    public DateTime ValidStart { get; set; }

    public DateTime ValidEnd { get; set; }

    public decimal Price { get; set; }

    public decimal Contracted { get; set; }

    public int SmProdStatusId { get; set; }

    public virtual SmBranch SmBranch { get; set; } = null!;

    public virtual ICollection<SmFile> SmFiles { get; set; } = new List<SmFile>();

    public virtual ICollection<SmProdAd> SmProdAds { get; set; } = new List<SmProdAd>();

    public virtual ICollection<SmProdCat> SmProdCats { get; set; } = new List<SmProdCat>();

    public virtual ICollection<SmProdDesc> SmProdDescs { get; set; } = new List<SmProdDesc>();

    public virtual ICollection<SmProdInfo> SmProdInfos { get; set; } = new List<SmProdInfo>();

    public virtual SmProdStatus SmProdStatus { get; set; } = null!;

    public virtual ICollection<SmProdSupplier> SmProdSuppliers { get; set; } = new List<SmProdSupplier>();

    public virtual ICollection<SmRate> SmRates { get; set; } = new List<SmRate>();
}
