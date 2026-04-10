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

    public virtual DbSet<JobMainStatus> JobMainStatuses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<JobMainStatus>(entity =>
        {
            entity.ToTable("JobMainStatus");

            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
