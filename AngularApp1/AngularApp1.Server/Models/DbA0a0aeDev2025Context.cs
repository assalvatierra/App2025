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

    public virtual DbSet<Agent> Agents { get; set; }

    public virtual DbSet<AgentBin> AgentBins { get; set; }

    public virtual DbSet<AgentInstruction> AgentInstructions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agent>(entity =>
        {
            entity.ToTable("Agent");

            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
        });

        modelBuilder.Entity<AgentBin>(entity =>
        {
            entity.ToTable("Agent_bin");

            entity.Property(e => e.DtAdded).HasColumnName("dtAdded");

            entity.HasOne(d => d.Agent).WithMany(p => p.AgentBins)
                .HasForeignKey(d => d.AgentId)
                .HasConstraintName("FK_Agent_bin_Agent_0");
        });

        modelBuilder.Entity<AgentInstruction>(entity =>
        {
            entity.ToTable("Agent_instructions");

            entity.Property(e => e.Keywords)
                .HasMaxLength(4000)
                .HasColumnName("keywords");
            entity.Property(e => e.Title).HasMaxLength(4000);

            entity.HasOne(d => d.Agent).WithMany(p => p.AgentInstructions)
                .HasForeignKey(d => d.AgentId)
                .HasConstraintName("FK_Agent_instructions_Agent_0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
