using System;
using System.Collections.Generic;

namespace eJobs.Model;

public partial class CustEntMain
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Address { get; set; }

    public string? Contact1 { get; set; }

    public string? Contact2 { get; set; }

    public string? IconPath { get; set; }

    public string? Website { get; set; }

    public string? Remarks { get; set; }

    public int? CityId { get; set; }

    public string? Status { get; set; }

    public string? AssignedTo { get; set; }

    public string? Mobile { get; set; }

    public string? Code { get; set; }

    public string? Exclusive { get; set; }

    public int CustEntAccountTypeId { get; set; }

    public virtual CustEntAccountType CustEntAccountType { get; set; } = null!;

    public virtual ICollection<CustEntActivity> CustEntActivities { get; set; } = new List<CustEntActivity>();

    public virtual ICollection<CustEntAddress> CustEntAddresses { get; set; } = new List<CustEntAddress>();

    public virtual ICollection<CustEntAssign> CustEntAssigns { get; set; } = new List<CustEntAssign>();

    public virtual ICollection<CustEntCat> CustEntCats { get; set; } = new List<CustEntCat>();

    public virtual ICollection<CustEntClause> CustEntClauses { get; set; } = new List<CustEntClause>();

    public virtual ICollection<CustEntDocument> CustEntDocuments { get; set; } = new List<CustEntDocument>();

    public virtual ICollection<CustEntity> CustEntities { get; set; } = new List<CustEntity>();

    public virtual ICollection<JobEntMain> JobEntMains { get; set; } = new List<JobEntMain>();

    public virtual ICollection<SalesLeadCompany> SalesLeadCompanies { get; set; } = new List<SalesLeadCompany>();

    public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
