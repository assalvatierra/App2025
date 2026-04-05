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
        public DbSet<Erp.Domain.Models.Agent> Agent{ get; set; } = default!
;
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
        public DbSet<Erp.Domain.Models.EntityContact> EntityContact { get; set; } = default!;
        public DbSet<Erp.Domain.Models.BusinessUnit> BusinessUnit { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ServiceItem> ServiceItem { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobMain> JobMain { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobService> JobService { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobCustomer> JobCustomers { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemTypeClass> ItemTypeClass { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemStatusClass> ItemStatusClass { get; set; } = default!;
        
        // Timesheet related DbSets
        public DbSet<Erp.Domain.Models.Timesheet> Timesheet { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobTimesheet> JobTimesheet { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobServiceTimesheet> JobServiceTimesheet { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Resource> Resource { get; set; } = default!;
        public DbSet<Erp.Domain.Models.TimesheetExpenseDetail> TimesheetExpenseDetail { get; set; } = default!;

        // Receivable related DbSets
        public DbSet<Erp.Domain.Models.Receivable> Receivables { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ReceivableCustomer> ReceivableCustomers { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobReceivable> JobReceivables { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ReceivableStatus> ReceivableStatuses { get; set; } = default!;

        // Payment related DbSets
        public DbSet<Erp.Domain.Models.Payment> Payments { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ReceivablePayment> ReceivablePayments { get; set; } = default!;

        // Expense related DbSets
        public DbSet<Erp.Domain.Models.Expense> Expenses { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ExpenseStatus> ExpenseStatuses { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ExpensePayment> ExpensePayments { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobExpense> JobExpenses { get; set; } = default!;

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

            // Configure Timesheet relationships
            modelBuilder.Entity<Timesheet>()
                .HasOne(t => t.Resource)
                .WithMany(r => r.TimesheetResources)
                .HasForeignKey(t => t.ResourceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Timesheet>()
                .HasOne(t => t.ResourceId1Navigation)
                .WithMany(r => r.TimesheetResourceId1Navigations)
                .HasForeignKey(t => t.ResourceId1)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure JobTimesheet relationships
            modelBuilder.Entity<JobTimesheet>()
                .HasOne<Timesheet>()
                .WithMany()
                .HasForeignKey(jt => jt.TimesheetId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<JobTimesheet>()
                .HasOne<JobMain>()
                .WithMany()
                .HasForeignKey(jt => jt.JobMainId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure JobServiceTimesheet relationships
            modelBuilder.Entity<JobServiceTimesheet>()
                .HasOne<Timesheet>()
                .WithMany()
                .HasForeignKey(jst => jst.TimesheetId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<JobServiceTimesheet>()
                .HasOne<JobService>()
                .WithMany()
                .HasForeignKey(jst => jst.JobServiceId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure TimesheetExpenseDetail (1-to-1 with Timesheet, PK = TimesheetId)
            modelBuilder.Entity<TimesheetExpenseDetail>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            // Map Receivables DbSet to Receivable table (singular)
            modelBuilder.Entity<Receivable>().ToTable("Receivable");

            // Map ReceivableCustomers DbSet to ReceivableCustomer table (singular)
            modelBuilder.Entity<ReceivableCustomer>().ToTable("ReceivableCustomer");

            // Map JobReceivables DbSet to JobReceivable table (singular)
            modelBuilder.Entity<JobReceivable>().ToTable("JobReceivable");

            // Map ReceivableStatuses DbSet to ReceivableStatus table (singular)
            modelBuilder.Entity<ReceivableStatus>().ToTable("ReceivableStatus");

            // Map ReceivablePayments DbSet to ReceivablePayment table (singular)
            modelBuilder.Entity<ReceivablePayment>().ToTable("ReceivablePayment");

            // Map Payments DbSet to Payment table (singular)
            modelBuilder.Entity<Payment>().ToTable("Payment");

            // Map Expense DbSets to singular table names
            modelBuilder.Entity<Expense>().ToTable("Expense");
            modelBuilder.Entity<ExpenseStatus>().ToTable("ExpenseStatus");
            modelBuilder.Entity<ExpensePayment>().ToTable("ExpensePayment");
            modelBuilder.Entity<JobExpense>().ToTable("JobExpense");

            // Configure Expense relationships
            modelBuilder.Entity<ExpenseStatus>()
                .HasOne(es => es.Expense)
                .WithMany(e => e.ExpenseStatuses)
                .HasForeignKey(es => es.ExpenseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ExpensePayment>()
                .HasOne(ep => ep.Expenses)
                .WithMany(e => e.ExpensePayments)
                .HasForeignKey(ep => ep.ExpensesId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure JobExpense relationships
            modelBuilder.Entity<JobExpense>()
                .HasOne(je => je.Expense)
                .WithMany(e => e.JobExpenses)
                .HasForeignKey(je => je.ExpensesId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
