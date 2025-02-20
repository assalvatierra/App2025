using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;

namespace Erp2025.Data
{
    public partial class Erp2025Context : DbContext
    {
        public Erp2025Context (DbContextOptions<Erp2025Context> options)
            : base(options)
        {
        }
        public DbSet<Erp.Domain.Models.Customer> Customer { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Supplier> Supplier { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Contact> Contact { get; set; } = default!;

        public DbSet<CustomerContact> CustomerContacts { get; set; }

        public virtual DbSet<SupplierContact> SupplierContacts { get; set; }
        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<RefCity> RefCities { get; set; }

        public virtual DbSet<RefCountry> RefCountries { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRole>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");
            });

            modelBuilder.Entity<AspNetUser>(entity =>
            {
                entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

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

            modelBuilder.Entity<CustomerContact>(entity =>
            {
                entity.HasOne(d => d.Contact).WithMany(p => p.CustomerContacts).HasConstraintName("FK_Customer_Contact_Contact_1");

                entity.HasOne(d => d.Customer).WithMany(p => p.CustomerContacts).HasConstraintName("FK_Customer_Contact_Customer_0");
            });

            modelBuilder.Entity<RefCity>(entity =>
            {
                entity.HasOne(d => d.RefCountry).WithMany(p => p.RefCities).HasConstraintName("FK_RefCity_RefCountry_0");
            });

            modelBuilder.Entity<SupplierContact>(entity =>
            {
                entity.HasOne(d => d.Contact).WithMany(p => p.SupplierContacts).HasConstraintName("FK_Supplier_Contact_Contact_1");

                entity.HasOne(d => d.Supplier).WithMany(p => p.SupplierContacts).HasConstraintName("FK_Supplier_Contact_Supplier_0");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
