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

    public virtual DbSet<PayAddition> PayAdditions { get; set; }

    public virtual DbSet<PayExpense> PayExpenses { get; set; }

    public virtual DbSet<PayPeriod> PayPeriods { get; set; }

    public virtual DbSet<ResourceRate> ResourceRates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PayAddition>(entity =>
        {
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.IsAdd).HasColumnName("isAdd");
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<PayExpense>(entity =>
        {
            entity.ToTable("PayExpense");
        });

        modelBuilder.Entity<PayPeriod>(entity =>
        {
            entity.ToTable("PayPeriod");

            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Notes).HasMaxLength(4000);
        });

        modelBuilder.Entity<ResourceRate>(entity =>
        {
            entity.ToTable("ResourceRate");

            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.Daily).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Hourly).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Monthly).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.OtRate).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Percent).HasColumnType("decimal(18, 0)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
