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

    public virtual DbSet<JobServiceRequirement> JobServiceRequirements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<JobServiceRequirement>(entity =>
        {
            entity.ToTable("JobServiceRequirement");

            entity.Property(e => e.Notes).HasMaxLength(4000);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
