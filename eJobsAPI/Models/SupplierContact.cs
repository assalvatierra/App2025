using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class SupplierContact
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Mobile { get; set; } = null!;

    public string Landline { get; set; } = null!;

    public string SkypeId { get; set; } = null!;

    public string ViberId { get; set; } = null!;

    public string Remarks { get; set; } = null!;

    public int SupplierId { get; set; }

    public string? WhatsApp { get; set; }

    public string? Email { get; set; }

    public int SupplierContactStatusId { get; set; }

    public string? WeChat { get; set; }

    public string? Position { get; set; }

    public string? Department { get; set; }

    public virtual Supplier Supplier { get; set; } = null!;
}
