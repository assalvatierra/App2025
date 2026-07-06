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

    public virtual DbSet<PortalCategory> PortalCategories { get; set; }

    public virtual DbSet<PortalItemCategory> PortalItemCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PortalCategory>(entity =>
        {
            entity.ToTable("PortalCategory");

            entity.Property(e => e.JsonData)
                .HasMaxLength(4000)
                .HasColumnName("jsonData");
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Status).HasMaxLength(50);
        });

        modelBuilder.Entity<PortalItemCategory>(entity =>
        {
            entity.ToTable("PortalItemCategory");

            entity.HasOne(d => d.PortalCategory).WithMany(p => p.PortalItemCategories)
                .HasForeignKey(d => d.PortalCategoryId)
                .HasConstraintName("FK_PortalItemCategory_PortalCategory_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
