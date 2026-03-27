using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Erp.Domain.Models;

public partial class DbA0a0aeDev2025Context : DbContext
{
    public DbA0a0aeDev2025Context(DbContextOptions<DbA0a0aeDev2025Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Expense> Expenses { get; set; }

    public virtual DbSet<ExpensePayment> ExpensePayments { get; set; }

    public virtual DbSet<ExpenseStatus> ExpenseStatuses { get; set; }

    public virtual DbSet<JobReceivable> JobReceivables { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Receivable> Receivables { get; set; }

    public virtual DbSet<ReceivableCustomer> ReceivableCustomers { get; set; }

    public virtual DbSet<ReceivablePayment> ReceivablePayments { get; set; }

    public virtual DbSet<ReceivableStatus> ReceivableStatuses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Expense>(entity =>
        {
            entity.ToTable("Expense");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<ExpensePayment>(entity =>
        {
            entity.ToTable("ExpensePayment");

            entity.HasOne(d => d.Expenses).WithMany(p => p.ExpensePayments)
                .HasForeignKey(d => d.ExpensesId)
                .HasConstraintName("FK_ExpensePayment_Expense_0");

            entity.HasOne(d => d.Payments).WithMany(p => p.ExpensePayments)
                .HasForeignKey(d => d.PaymentsId)
                .HasConstraintName("FK_ExpensePayment_Payment_1");
        });

        modelBuilder.Entity<ExpenseStatus>(entity =>
        {
            entity.ToTable("ExpenseStatus");

            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.Expense).WithMany(p => p.ExpenseStatuses)
                .HasForeignKey(d => d.ExpenseId)
                .HasConstraintName("FK_ExpenseStatus_Expense_0");
        });

        modelBuilder.Entity<JobReceivable>(entity =>
        {
            entity.ToTable("JobReceivable");

            entity.HasOne(d => d.Receivables).WithMany(p => p.JobReceivables)
                .HasForeignKey(d => d.ReceivablesId)
                .HasConstraintName("FK_JobReceivable_Receivable_0");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.ToTable("Payment");

            entity.Property(e => e.AdditionalInfo).HasMaxLength(4000);
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<Receivable>(entity =>
        {
            entity.ToTable("Receivable");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
            entity.Property(e => e.TrxRef).HasMaxLength(4000);
        });

        modelBuilder.Entity<ReceivableCustomer>(entity =>
        {
            entity.ToTable("ReceivableCustomer");

            entity.HasOne(d => d.Receivables).WithMany(p => p.ReceivableCustomers)
                .HasForeignKey(d => d.ReceivablesId)
                .HasConstraintName("FK_ReceivableCustomer_Receivable_0");
        });

        modelBuilder.Entity<ReceivablePayment>(entity =>
        {
            entity.ToTable("ReceivablePayment");

            entity.HasOne(d => d.Payments).WithMany(p => p.ReceivablePayments)
                .HasForeignKey(d => d.PaymentsId)
                .HasConstraintName("FK_ReceivablePayment_Payment_1");

            entity.HasOne(d => d.Receivables).WithMany(p => p.ReceivablePayments)
                .HasForeignKey(d => d.ReceivablesId)
                .HasConstraintName("FK_ReceivablePayment_Receivable_0");
        });

        modelBuilder.Entity<ReceivableStatus>(entity =>
        {
            entity.ToTable("ReceivableStatus");

            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.Receivable).WithMany(p => p.ReceivableStatuses)
                .HasForeignKey(d => d.ReceivableId)
                .HasConstraintName("FK_ReceivableStatus_Receivable_0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
