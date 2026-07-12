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

    public virtual DbSet<PortalItemPrice> PortalItemPrices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PortalItemPrice>(entity =>
        {
            entity.ToTable("PortalItemPrice");

            entity.Property(e => e.BaseCurrency).HasMaxLength(5);
            entity.Property(e => e.BasePrice).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.BaseUnit).HasMaxLength(20);
            entity.Property(e => e.JsonData)
                .HasMaxLength(4000)
                .HasColumnName("jsonData");
            entity.Property(e => e.Status).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
