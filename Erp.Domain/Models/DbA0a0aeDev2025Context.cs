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

    public virtual DbSet<PaymentExternal> PaymentExternals { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PaymentExternal>(entity =>
        {
            entity.ToTable("PaymentExternal");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Currency).HasMaxLength(4000);
            entity.Property(e => e.Gateway).HasMaxLength(4000);
            entity.Property(e => e.JsonInfo).HasMaxLength(4000);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
