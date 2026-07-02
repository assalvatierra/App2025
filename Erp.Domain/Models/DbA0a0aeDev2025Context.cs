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

    public virtual DbSet<PortalItem> PortalItems { get; set; }

    public virtual DbSet<PortalItemSpec> PortalItemSpecs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PortalItem>(entity =>
        {
            entity.ToTable("PortalItem");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.JsonData)
                .HasMaxLength(4000)
                .HasColumnName("jsonData");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<PortalItemSpec>(entity =>
        {
            entity.ToTable("PortalItemSpec");

            entity.Property(e => e.JsonData)
                .HasMaxLength(4000)
                .HasColumnName("jsonData");
            entity.Property(e => e.Order).HasColumnName("order");
            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.PortalItem).WithMany(p => p.PortalItemSpecs)
                .HasForeignKey(d => d.PortalItemId)
                .HasConstraintName("FK_PortalItemSpec_PortalItem_0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
