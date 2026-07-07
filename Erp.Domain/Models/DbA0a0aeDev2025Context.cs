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

    public virtual DbSet<PortalContent> PortalContents { get; set; }

    public virtual DbSet<PortalContentCategory> PortalContentCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PortalContent>(entity =>
        {
            entity.ToTable("PortalContent");

            entity.Property(e => e.JsonData)
                .HasMaxLength(4000)
                .HasColumnName("jsonData");
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Status).HasMaxLength(4000);
        });

        modelBuilder.Entity<PortalContentCategory>(entity =>
        {
            entity.ToTable("PortalContentCategory");

            entity.HasOne(d => d.PortalContent).WithMany(p => p.PortalContentCategories)
                .HasForeignKey(d => d.PortalContentId)
                .HasConstraintName("FK_PortalContentCategory_PortalContent_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
