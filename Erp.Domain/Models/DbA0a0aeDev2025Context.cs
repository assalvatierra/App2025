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

    public virtual DbSet<JobServiceResource> JobServiceResources { get; set; }

    public virtual DbSet<ResourceEntity> ResourceEntities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<JobServiceResource>(entity =>
        {
            entity.ToTable("JobServiceResource");
        });

        modelBuilder.Entity<ResourceEntity>(entity =>
        {
            entity.ToTable("ResourceEntity");

            entity.Property(e => e.Id).HasMaxLength(4000);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
