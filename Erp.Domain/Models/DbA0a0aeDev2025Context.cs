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

    public virtual DbSet<JobServiceTimesheet> JobServiceTimesheets { get; set; }

    public virtual DbSet<JobTimesheet> JobTimesheets { get; set; }

    public virtual DbSet<Resource> Resources { get; set; }

    public virtual DbSet<Timesheet> Timesheets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<JobServiceTimesheet>(entity =>
        {
            entity.ToTable("JobServiceTimesheet");
        });

        modelBuilder.Entity<JobTimesheet>(entity =>
        {
            entity.ToTable("JobTimesheet");
        });

        modelBuilder.Entity<Resource>(entity =>
        {
            entity.ToTable("Resource");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.JsonProperties)
                .HasMaxLength(4000)
                .HasColumnName("jsonProperties");
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<Timesheet>(entity =>
        {
            entity.ToTable("Timesheet");

            entity.Property(e => e.Remarks).HasMaxLength(4000);
            entity.Property(e => e.TsDate).HasColumnName("tsDate");

            entity.HasOne(d => d.Resource).WithMany(p => p.TimesheetResources)
                .HasForeignKey(d => d.ResourceId)
                .HasConstraintName("FK_Timesheet_Resource_0");

            entity.HasOne(d => d.ResourceId1Navigation).WithMany(p => p.TimesheetResourceId1Navigations)
                .HasForeignKey(d => d.ResourceId1)
                .HasConstraintName("FK_Timesheet_Resource_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
