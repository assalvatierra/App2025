using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using eJobs.Model;

namespace eJobs.Data
{
    public class JobDbContext : DbContext
    {
        public JobDbContext (DbContextOptions<JobDbContext> options)
            : base(options)
        {
        }
        public DbSet<eJobs.Model.CrLogTrip> CrLogTrips { get; set; } = default!;
        public DbSet<eJobs.Model.CrLogUnit> CrLogUnits { get; set; } = default!;
        public DbSet<eJobs.Model.CrLogDriver> CrLogDrivers { get; set; } = default!;
        public DbSet<eJobs.Model.CrLogCompany> CrLogCompanies { get; set; } = default!;
        public DbSet<eJobs.Model.CrLogTripJobMain> CrLogTripJobMains { get; set; } = default!;
        public DbSet<eJobs.Model.JobMain> JobMains { get; set; } = default!;
        public DbSet<eJobs.Model.JobService> JobServices { get; set; } = default!;
        public DbSet<eJobs.Model.JobStatus> JobStatus { get; set; } = default!;
        public DbSet<eJobs.Model.JobThru> JobThrus { get; set; } = default!;
        public DbSet<eJobs.Model.Branch> Branches { get; set; } = default!;

        public DbSet<eJobs.Model.CustEntMain> CustEntMains { get; set; } = default!;
        public DbSet<eJobs.Model.Customer> Customers { get; set; } = default!;
        public DbSet<eJobs.Model.JobServicePickup> JobServicePickups { get; set; } = default!;
        public DbSet<eJobs.Model.JobServiceItem> JobServiceItems { get; set; } = default!;
        public DbSet<eJobs.Model.JobEntMain> JobEntMains { get; set; } = default!;
        public DbSet<eJobs.Model.InvItem> InvItems { get; set; } = default!;
        public DbSet<eJobs.Model.Service> Services { get; set; } = default!;
        public DbSet<eJobs.Model.Supplier> Suppliers { get; set; } = default!;
        public DbSet<eJobs.Model.ArTransaction> ArTransactions { get; set; } = default!;
        public DbSet<eJobs.Model.ArPayment> ArPayments { get; set; } = default!;
        public DbSet<eJobs.Model.ArDeposit> ArDeposits { get; set; } = default!;
        public DbSet<eJobs.Model.ArTransStatus> ArTransStatus { get; set; } = default!;
        public DbSet<eJobs.Model.ArCategory> arCategories { get; set; } = default!;
        public DbSet<eJobs.Model.ArAccount> arAccounts  { get; set; } = default!;
        public DbSet<eJobs.Model.ArAccContact> ArAccContacts { get; set; } = default!;
        public DbSet<eJobs.Model.ArTransPayment> ArTransPayments { get; set; } = default!;
        public DbSet<eJobs.Model.ApTransaction> apTransactions { get; set; } = default!;
        public DbSet<eJobs.Model.ApAccount> apAccounts { get; set; } = default!;
        public DbSet<eJobs.Model.ApTransCategory> ApTransCategories { get; set; } = default!;
        public DbSet<eJobs.Model.ApPaymentStatus> ApPaymentStatuses { get; set; } = default!;
        public DbSet<eJobs.Model.ApPayment> ApPayments { get; set; } = default!;
        public DbSet<eJobs.Model.ApTransPayment> ApTransPayments { get; set; } = default!;
        public DbSet<eJobs.Model.InvCarRecord> InvCarRecords { get; set; } = default!;
        public DbSet<eJobs.Model.InvCarRecordType> InvCarRecordTypes { get; set; } = default!;
        public DbSet<eJobs.Model.InvCarMntRcmd> InvCarMntRcmds { get; set; } = default!;
        public DbSet<eJobs.Model.InvCarRcmdRequest> InvCarRcmdRequests { get; set; } = default!;
        public DbSet<eJobs.Model.InvCarRcmdStatus> InvCarRcmdStatus { get; set; } = default!;
        public DbSet<eJobs.Model.InvCarGateControl> InvCarGateControls { get; set; } = default!;



    }
}
