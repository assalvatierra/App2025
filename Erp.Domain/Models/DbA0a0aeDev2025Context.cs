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

    public virtual DbSet<PortalReservation> PortalReservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PortalReservation>(entity =>
        {
            entity.ToTable("PortalReservation");

            entity.Property(e => e.ContactEmail).HasMaxLength(4000);
            entity.Property(e => e.ContactNo).HasMaxLength(4000);
            entity.Property(e => e.CustomerName).HasMaxLength(4000);
            entity.Property(e => e.JsonData)
                .HasMaxLength(4000)
                .HasColumnName("jsonData");
            entity.Property(e => e.Status).HasMaxLength(100);
            entity.Property(e => e.TransactionType).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
