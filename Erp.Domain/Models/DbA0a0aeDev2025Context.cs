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

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<BusinessUnit> BusinessUnits { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Entity> Entities { get; set; }

    public virtual DbSet<EntityContact> EntityContacts { get; set; }

    public virtual DbSet<ItemStatus> ItemStatuses { get; set; }

    public virtual DbSet<ItemStatusClass> ItemStatusClasses { get; set; }

    public virtual DbSet<ItemType> ItemTypes { get; set; }

    public virtual DbSet<ItemTypeClass> ItemTypeClasses { get; set; }

    public virtual DbSet<JobContact> JobContacts { get; set; }

    public virtual DbSet<JobCustomer> JobCustomers { get; set; }

    public virtual DbSet<JobInventory> JobInventories { get; set; }

    public virtual DbSet<JobMain> JobMains { get; set; }

    public virtual DbSet<JobService> JobServices { get; set; }

    public virtual DbSet<JobServiceContact> JobServiceContacts { get; set; }

    public virtual DbSet<RefCity> RefCities { get; set; }

    public virtual DbSet<RefCountry> RefCountries { get; set; }

    public virtual DbSet<ServiceItem> ServiceItems { get; set; }

    public virtual DbSet<Agent> Agents { get; set; }

    public virtual DbSet<AgentBin> AgentBins { get; set; }

    public virtual DbSet<AgentInstruction> AgentInstructions { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedName] IS NOT NULL)");

            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetRoleClaim>(entity =>
        {
            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

            entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasForeignKey(d => d.RoleId);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                    l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("AspNetUserRoles");
                        j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                    });
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserToken>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<BusinessUnit>(entity =>
        {
            entity.ToTable("BusinessUnit");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.ToTable("Contact");

            entity.Property(e => e.Address1).HasMaxLength(4000);
            entity.Property(e => e.Address2).HasMaxLength(4000);
            entity.Property(e => e.ContactNo1).HasMaxLength(4000);
            entity.Property(e => e.ContactNo2).HasMaxLength(4000);
            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.Email1).HasMaxLength(4000);
            entity.Property(e => e.Email2).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.RefCity).WithMany(p => p.Contacts)
                .HasForeignKey(d => d.RefCityId)
                .HasConstraintName("FK_Contact_RefCity_2");

            entity.HasOne(d => d.Status).WithMany(p => p.Contacts)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contact_ItemStatus_1");

            entity.HasOne(d => d.Type).WithMany(p => p.Contacts)
                .HasForeignKey(d => d.TypeId)
                .HasConstraintName("FK_Contact_ItemType_0");
        });

        modelBuilder.Entity<Entity>(entity =>
        {
            entity.ToTable("Entity");

            entity.Property(e => e.Address1).HasMaxLength(4000);
            entity.Property(e => e.Address2).HasMaxLength(4000);
            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.ContactNo1).HasMaxLength(4000);
            entity.Property(e => e.ContactNo2).HasMaxLength(4000);
            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Email1).HasMaxLength(4000);
            entity.Property(e => e.Email2).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.BusinessUnit).WithMany(p => p.Entities)
                .HasForeignKey(d => d.BusinessUnitId)
                .HasConstraintName("FK_Entity_BusinessUnit_2");

            entity.HasOne(d => d.EntityStatus).WithMany(p => p.Entities)
                .HasForeignKey(d => d.EntityStatusId)
                .HasConstraintName("FK_Entity_ItemStatus_1");

            entity.HasOne(d => d.EntityType).WithMany(p => p.Entities)
                .HasForeignKey(d => d.EntityTypeId)
                .HasConstraintName("FK_Entity_ItemType_0");

            entity.HasOne(d => d.RefCity).WithMany(p => p.Entities)
                .HasForeignKey(d => d.RefCityId)
                .HasConstraintName("FK_Entity_RefCity_3");
        });

        modelBuilder.Entity<EntityContact>(entity =>
        {
            entity.ToTable("EntityContact");

            entity.Property(e => e.Notes).HasMaxLength(4000);

            entity.HasOne(d => d.Contact).WithMany(p => p.EntityContacts)
                .HasForeignKey(d => d.ContactId)
                .HasConstraintName("FK_EntityContact_Contact_0");

            entity.HasOne(d => d.Entity).WithMany(p => p.EntityContacts)
                .HasForeignKey(d => d.EntityId)
                .HasConstraintName("FK_EntityContact_Entity_1");
        });

        modelBuilder.Entity<ItemStatus>(entity =>
        {
            entity.ToTable("ItemStatus");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.ItemStatusClass).WithMany(p => p.ItemStatuses)
                .HasForeignKey(d => d.ItemStatusClassId)
                .HasConstraintName("FK_ItemStatus_ItemStatusClass_0");
        });

        modelBuilder.Entity<ItemStatusClass>(entity =>
        {
            entity.ToTable("ItemStatusClass");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<ItemType>(entity =>
        {
            entity.ToTable("ItemType");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.ItemTypeClass).WithMany(p => p.ItemTypes)
                .HasForeignKey(d => d.ItemTypeClassId)
                .HasConstraintName("FK_ItemType_ItemTypeClass_0");
        });

        modelBuilder.Entity<ItemTypeClass>(entity =>
        {
            entity.ToTable("ItemTypeClass");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<JobContact>(entity =>
        {
            entity.ToTable("JobContact");

            entity.Property(e => e.Notes).HasMaxLength(4000);

            entity.HasOne(d => d.Contact).WithMany(p => p.JobContacts)
                .HasForeignKey(d => d.ContactId)
                .HasConstraintName("FK_JobContact_Contact_1");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobContacts)
                .HasForeignKey(d => d.JobMainId)
                .HasConstraintName("FK_JobContact_JobMain_0");
        });

        modelBuilder.Entity<JobCustomer>(entity =>
        {
            entity.ToTable("JobCustomer");

            entity.Property(e => e.Notes).HasMaxLength(4000);

            entity.HasOne(d => d.Customer).WithMany(p => p.JobCustomers)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK_JobCustomer_Entity_1");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobCustomers)
                .HasForeignKey(d => d.JobMainId)
                .HasConstraintName("FK_JobCustomer_JobMain_0");
        });

        modelBuilder.Entity<JobInventory>(entity =>
        {
            entity.ToTable("JobInventory");

            entity.Property(e => e.Particulars).HasMaxLength(4000);
            entity.Property(e => e.QtyRequired).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobInventories)
                .HasForeignKey(d => d.JobMainId)
                .HasConstraintName("FK_JobInventory_JobMain_0");
        });

        modelBuilder.Entity<JobMain>(entity =>
        {
            entity.ToTable("JobMain");

            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);

            entity.HasOne(d => d.BusinessUnit).WithMany(p => p.JobMains)
                .HasForeignKey(d => d.BusinessUnitId)
                .HasConstraintName("FK_JobMain_BusinessUnit_1");

            entity.HasOne(d => d.ItemStatus).WithMany(p => p.JobMains)
                .HasForeignKey(d => d.ItemStatusId)
                .HasConstraintName("FK_JobMain_ItemStatus_0");
        });

        modelBuilder.Entity<JobService>(entity =>
        {
            entity.ToTable("JobService");

            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Particulars).HasMaxLength(4000);
            entity.Property(e => e.QuotedAmt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.SupplierAmt).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.ItemStatus).WithMany(p => p.JobServices)
                .HasForeignKey(d => d.ItemStatusId)
                .HasConstraintName("FK_JobService_ItemStatus_3");

            entity.HasOne(d => d.JobMain).WithMany(p => p.JobServices)
                .HasForeignKey(d => d.JobMainId)
                .HasConstraintName("FK_JobService_JobMain_0");

            entity.HasOne(d => d.ServiceItem).WithMany(p => p.JobServices)
                .HasForeignKey(d => d.ServiceItemId)
                .HasConstraintName("FK_JobService_ServiceItem_1");

            entity.HasOne(d => d.Supplier).WithMany(p => p.JobServices)
                .HasForeignKey(d => d.SupplierId)
                .HasConstraintName("FK_JobService_Entity_2");
        });

        modelBuilder.Entity<JobServiceContact>(entity =>
        {
            entity.ToTable("JobServiceContact");

            entity.Property(e => e.Notes).HasMaxLength(4000);

            entity.HasOne(d => d.Contact).WithMany(p => p.JobServiceContacts)
                .HasForeignKey(d => d.ContactId)
                .HasConstraintName("FK_JobServiceContact_Contact_0");

            entity.HasOne(d => d.JobService).WithMany(p => p.JobServiceContacts)
                .HasForeignKey(d => d.JobServiceId)
                .HasConstraintName("FK_JobServiceContact_JobService_1");
        });

        modelBuilder.Entity<RefCity>(entity =>
        {
            entity.ToTable("RefCity");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.RefCountry).WithMany(p => p.RefCities)
                .HasForeignKey(d => d.RefCountryId)
                .HasConstraintName("FK_RefCity_RefCountry_0");
        });

        modelBuilder.Entity<RefCountry>(entity =>
        {
            entity.ToTable("RefCountry");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);
        });

        modelBuilder.Entity<ServiceItem>(entity =>
        {
            entity.ToTable("ServiceItem");

            entity.Property(e => e.Code).HasMaxLength(4000);
            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
            entity.Property(e => e.Description).HasMaxLength(4000);
            entity.Property(e => e.IsActive).HasColumnName("isActive");
            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
            entity.Property(e => e.Name).HasMaxLength(4000);
            entity.Property(e => e.Remarks).HasMaxLength(4000);

            entity.HasOne(d => d.ItemStatus).WithMany(p => p.ServiceItems)
                .HasForeignKey(d => d.ItemStatusId)
                .HasConstraintName("FK_ServiceItem_ItemStatus_1");

            entity.HasOne(d => d.ItemType).WithMany(p => p.ServiceItems)
                .HasForeignKey(d => d.ItemTypeId)
                .HasConstraintName("FK_ServiceItem_ItemType_0");
        });

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


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
