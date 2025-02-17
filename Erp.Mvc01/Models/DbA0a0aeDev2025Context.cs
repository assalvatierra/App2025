using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Erp.Mvc01.Models;

public partial class DbA0a0aeDev2025Context : DbContext
{
    public DbA0a0aeDev2025Context()
    {
    }

    public DbA0a0aeDev2025Context(DbContextOptions<DbA0a0aeDev2025Context> options)
        : base(options)
    {
    }

    public virtual DbSet<CustMain> CustMains { get; set; }

    public virtual DbSet<CustStatus> CustStatuses { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data source=SQL5113.site4now.net;Initial Catalog=db_a0a0ae_dev2025;User Id=db_a0a0ae_dev2025_admin;Password=Dev12345!");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustMain>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.EditedBy).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.CustStatus).WithMany(p => p.CustMains)
                .HasForeignKey(d => d.CustStatusId)
                .HasConstraintName("FK_CustMains_CustStatuses_0");
        });

        modelBuilder.Entity<CustStatus>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Display).HasMaxLength(4000);
            entity.Property(e => e.OrderNo).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
