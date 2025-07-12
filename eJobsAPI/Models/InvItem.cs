using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class InvItem
{
    public int Id { get; set; }

    public string ItemCode { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Remarks { get; set; }

    public string? ImgPath { get; set; }

    public string? ContactInfo { get; set; }

    public string? ViewLabel { get; set; }

    public int? OrderNo { get; set; }

    public virtual ICollection<CoopMemberItem> CoopMemberItems { get; set; } = new List<CoopMemberItem>();

    public virtual ICollection<InvCarGateControl> InvCarGateControls { get; set; } = new List<InvCarGateControl>();

    public virtual ICollection<InvCarRecord> InvCarRecords { get; set; } = new List<InvCarRecord>();

    public virtual ICollection<InvItemCategory> InvItemCategories { get; set; } = new List<InvItemCategory>();

    public virtual ICollection<JobServiceItem> JobServiceItems { get; set; } = new List<JobServiceItem>();

    public virtual ICollection<SalesLeadItem> SalesLeadItems { get; set; } = new List<SalesLeadItem>();

    public virtual ICollection<SupplierInvItem> SupplierInvItems { get; set; } = new List<SupplierInvItem>();
}
