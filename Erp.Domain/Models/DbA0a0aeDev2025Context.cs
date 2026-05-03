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

    public virtual DbSet<ChecklistItem> ChecklistItems { get; set; }

    public virtual DbSet<ChecklistTransaction> ChecklistTransactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChecklistItem>(entity =>
        {
            entity.ToTable("ChecklistItem");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<ChecklistTransaction>(entity =>
        {
            entity.ToTable("ChecklistTransaction");

            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Notes).HasMaxLength(4000);
            entity.Property(e => e.RefObject).HasMaxLength(4000);

            entity.HasOne(d => d.ChecklistItem).WithMany(p => p.ChecklistTransactions)
                .HasForeignKey(d => d.ChecklistItemId)
                .HasConstraintName("FK_ChecklistTransaction_ChecklistItem_0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
