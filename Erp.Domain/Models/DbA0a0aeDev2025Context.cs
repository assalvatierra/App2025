//using System;
//using System.Collections.Generic;
//using Microsoft.EntityFrameworkCore;

//namespace Erp.Domain.Models;

//public partial class DbA0a0aeDev2025Context : DbContext
//{
//    public DbA0a0aeDev2025Context()
//    {
//    }

//    public DbA0a0aeDev2025Context(DbContextOptions<DbA0a0aeDev2025Context> options)
//        : base(options)
//    {
//    }

//    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

//    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

//    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

//    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

//    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

//    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

//    public virtual DbSet<Contact> Contacts { get; set; }

//    public virtual DbSet<Customer> Customers { get; set; }

//    public virtual DbSet<CustomerContact> CustomerContacts { get; set; }

//    public virtual DbSet<Product> Products { get; set; }

//    public virtual DbSet<RefCity> RefCities { get; set; }

//    public virtual DbSet<RefCountry> RefCountries { get; set; }

//    public virtual DbSet<Supplier> Suppliers { get; set; }

//    public virtual DbSet<SupplierContact> SupplierContacts { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Data source=SQL5113.site4now.net;Initial Catalog=db_a0a0ae_dev2025;User Id=db_a0a0ae_dev2025_admin;Password=Dev12345!");

//    protected override void OnModelCreating(ModelBuilder modelBuilder)
//    {
//        modelBuilder.Entity<AspNetRole>(entity =>
//        {
//            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
//                .IsUnique()
//                .HasFilter("([NormalizedName] IS NOT NULL)");

//            entity.Property(e => e.Name).HasMaxLength(256);
//            entity.Property(e => e.NormalizedName).HasMaxLength(256);
//        });

//        modelBuilder.Entity<AspNetRoleClaim>(entity =>
//        {
//            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

//            entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasForeignKey(d => d.RoleId);
//        });

//        modelBuilder.Entity<AspNetUser>(entity =>
//        {
//            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

//            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
//                .IsUnique()
//                .HasFilter("([NormalizedUserName] IS NOT NULL)");

//            entity.Property(e => e.Email).HasMaxLength(256);
//            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
//            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
//            entity.Property(e => e.UserName).HasMaxLength(256);

//            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
//                .UsingEntity<Dictionary<string, object>>(
//                    "AspNetUserRole",
//                    r => r.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
//                    l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
//                    j =>
//                    {
//                        j.HasKey("UserId", "RoleId");
//                        j.ToTable("AspNetUserRoles");
//                        j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
//                    });
//        });

//        modelBuilder.Entity<AspNetUserClaim>(entity =>
//        {
//            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

//            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasForeignKey(d => d.UserId);
//        });

//        modelBuilder.Entity<AspNetUserLogin>(entity =>
//        {
//            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

//            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

//            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasForeignKey(d => d.UserId);
//        });

//        modelBuilder.Entity<AspNetUserToken>(entity =>
//        {
//            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

//            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
//        });

//        modelBuilder.Entity<Contact>(entity =>
//        {
//            entity.ToTable("Contact");

//            entity.Property(e => e.Address1).HasMaxLength(4000);
//            entity.Property(e => e.Address2).HasMaxLength(4000);
//            entity.Property(e => e.ContactNo1).HasMaxLength(4000);
//            entity.Property(e => e.ContactNo2).HasMaxLength(4000);
//            entity.Property(e => e.CountryId).HasMaxLength(4000);
//            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
//            entity.Property(e => e.Email1).HasMaxLength(4000);
//            entity.Property(e => e.Email2).HasMaxLength(4000);
//            entity.Property(e => e.IsActive).HasColumnName("isActive");
//            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
//            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
//            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
//            entity.Property(e => e.Name).HasMaxLength(4000);
//            entity.Property(e => e.Remarks).HasMaxLength(4000);
//        });

//        modelBuilder.Entity<Customer>(entity =>
//        {
//            entity.ToTable("Customer");

//            entity.Property(e => e.Address1).HasMaxLength(4000);
//            entity.Property(e => e.Address2).HasMaxLength(4000);
//            entity.Property(e => e.ContactNo1).HasMaxLength(4000);
//            entity.Property(e => e.ContactNo2).HasMaxLength(4000);
//            entity.Property(e => e.CountryId).HasMaxLength(4000);
//            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
//            entity.Property(e => e.Email1).HasMaxLength(4000);
//            entity.Property(e => e.Email2).HasMaxLength(4000);
//            entity.Property(e => e.IsActive).HasColumnName("isActive");
//            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
//            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
//            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
//            entity.Property(e => e.Name).HasMaxLength(4000);
//            entity.Property(e => e.Remarks).HasMaxLength(4000);
//        });

//        modelBuilder.Entity<CustomerContact>(entity =>
//        {
//            entity.ToTable("Customer_Contact");

//            entity.HasOne(d => d.Contact).WithMany(p => p.CustomerContacts)
//                .HasForeignKey(d => d.ContactId)
//                .HasConstraintName("FK_Customer_Contact_Contact_1");

//            entity.HasOne(d => d.Customer).WithMany(p => p.CustomerContacts)
//                .HasForeignKey(d => d.CustomerId)
//                .HasConstraintName("FK_Customer_Contact_Customer_0");
//        });

//        modelBuilder.Entity<Product>(entity =>
//        {
//            entity.ToTable("Product");

//            entity.Property(e => e.Code).HasMaxLength(4000);
//            entity.Property(e => e.Name).HasMaxLength(4000);
//            entity.Property(e => e.Remarks).HasMaxLength(4000);
//        });

//        modelBuilder.Entity<RefCity>(entity =>
//        {
//            entity.ToTable("RefCity");

//            entity.Property(e => e.Id).HasMaxLength(4000);
//            entity.Property(e => e.Name).HasMaxLength(4000);

//            entity.HasOne(d => d.RefCountry).WithMany(p => p.RefCities)
//                .HasForeignKey(d => d.RefCountryId)
//                .HasConstraintName("FK_RefCity_RefCountry_0");
//        });

//        modelBuilder.Entity<RefCountry>(entity =>
//        {
//            entity.ToTable("RefCountry");

//            entity.Property(e => e.Name).HasMaxLength(4000);
//        });

//        modelBuilder.Entity<Supplier>(entity =>
//        {
//            entity.ToTable("Supplier");

//            entity.Property(e => e.Address1).HasMaxLength(4000);
//            entity.Property(e => e.Address2).HasMaxLength(4000);
//            entity.Property(e => e.ContactNo1).HasMaxLength(4000);
//            entity.Property(e => e.ContactNo2).HasMaxLength(4000);
//            entity.Property(e => e.CountryId).HasMaxLength(4000);
//            entity.Property(e => e.CreatedBy).HasMaxLength(4000);
//            entity.Property(e => e.Email1).HasMaxLength(4000);
//            entity.Property(e => e.Email2).HasMaxLength(4000);
//            entity.Property(e => e.IsActive).HasColumnName("isActive");
//            entity.Property(e => e.IsArchived).HasColumnName("isArchived");
//            entity.Property(e => e.IsPrivate).HasColumnName("isPrivate");
//            entity.Property(e => e.LastEditBy).HasMaxLength(4000);
//            entity.Property(e => e.Name).HasMaxLength(4000);
//            entity.Property(e => e.Remarks).HasMaxLength(4000);
//        });

//        modelBuilder.Entity<SupplierContact>(entity =>
//        {
//            entity.ToTable("Supplier_Contact");

//            entity.HasOne(d => d.Contact).WithMany(p => p.SupplierContacts)
//                .HasForeignKey(d => d.ContactId)
//                .HasConstraintName("FK_Supplier_Contact_Contact_1");

//            entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierContacts)
//                .HasForeignKey(d => d.SupplierId)
//                .HasConstraintName("FK_Supplier_Contact_Supplier_0");
//        });

//        OnModelCreatingPartial(modelBuilder);
//    }

//    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
//}
