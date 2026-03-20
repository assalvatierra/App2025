using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;

namespace AngularApp1.Server.Data
{
    public class ErpDbContext : DbContext
    {
        public ErpDbContext (DbContextOptions<ErpDbContext> options)
            : base(options)
        {
        }

        public DbSet<Erp.Domain.Models.SysFeature> SysFeature { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Agent> Agent{ get; set; } = default!;
        public DbSet<Erp.Domain.Models.AgentBin> AgentBin { get; set; } = default!;
        public DbSet<Erp.Domain.Models.AgentInstruction> AgentInstruction { get; set; } = default!;
        public DbSet<AgentTask> AgentTask { get; set; }
        public DbSet<AgentTaskStatus> AgentTaskStatus { get; set; }
        public DbSet<Erp.Domain.Models.RefCountry> RefCountry { get; set; } = default!;
        public DbSet<Erp.Domain.Models.RefCity> RefCity { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemType> ItemType { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemStatus> ItemStatus { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Contact> Contact { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Entity> Entity { get; set; } = default!;
        public DbSet<Erp.Domain.Models.BusinessUnit> BusinessUnit { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ServiceItem> ServiceItem { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobMain> JobMain { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobService> JobService { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobCustomer> JobCustomers { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemTypeClass> ItemTypeClass { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemStatusClass> ItemStatusClass { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map JobCustomers DbSet to JobCustomer table (singular)
            modelBuilder.Entity<JobCustomer>().ToTable("JobCustomer");

            // Configure relationships
            modelBuilder.Entity<JobCustomer>()
                .HasOne(jc => jc.JobMain)
                .WithMany(jm => jm.JobCustomers)
                .HasForeignKey(jc => jc.JobMainId);

            modelBuilder.Entity<JobCustomer>()
                .HasOne(jc => jc.Customer)
                .WithMany(e => e.JobCustomers)
                .HasForeignKey(jc => jc.CustomerId);
        }
    }
}
