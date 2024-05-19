﻿//------------------------------------------------------------------------------
// This is auto-generated code.
//------------------------------------------------------------------------------
// This code was generated by Entity Developer tool using EF Core template.
// Code is generated on: 5/18/2024 12:42:36 AM
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
//------------------------------------------------------------------------------

using System;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.ComponentModel;
using System.Reflection;
using System.Data.Common;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata;
using Entities;

namespace Context
{

    public partial class Models : DbContext
    {

        public Models() :
            base()
        {
            OnCreated();
        }

        public Models(DbContextOptions<Models> options) :
            base(options)
        {
            OnCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured ||
                (!optionsBuilder.Options.Extensions.OfType<RelationalOptionsExtension>().Any(ext => !string.IsNullOrEmpty(ext.ConnectionString) || ext.Connection != null) &&
                 !optionsBuilder.Options.Extensions.Any(ext => !(ext is RelationalOptionsExtension) && !(ext is CoreOptionsExtension))))
            {
            }
            CustomizeConfiguration(ref optionsBuilder);
            base.OnConfiguring(optionsBuilder);
        }

        partial void CustomizeConfiguration(ref DbContextOptionsBuilder optionsBuilder);

        public virtual DbSet<CustMain> CustMains
        {
            get;
            set;
        }

        public virtual DbSet<CustStatus> CustStatuses
        {
            get;
            set;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            this.CustMainMapping(modelBuilder);
            this.CustomizeCustMainMapping(modelBuilder);

            this.CustStatusMapping(modelBuilder);
            this.CustomizeCustStatusMapping(modelBuilder);

            RelationshipsMapping(modelBuilder);
            CustomizeMapping(ref modelBuilder);
        }

        #region CustMain Mapping

        private void CustMainMapping(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustMain>().ToTable(@"CustMains");
            modelBuilder.Entity<CustMain>().Property<int>(x => x.Id).HasColumnName(@"Id").IsRequired().ValueGeneratedOnAdd();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.DataInfo).Property<string>(x => x.Name).HasColumnName(@"Name").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.DataInfo).Property<string>(x => x.Description).HasColumnName(@"Description").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.DataInfo).Property<string>(x => x.Remarks).HasColumnName(@"Remarks").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.RecordInfo).Property<System.DateTime?>(x => x.DtCreated).HasColumnName(@"DtCreated").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.RecordInfo).Property<string>(x => x.CreatedBy).HasColumnName(@"CreatedBy").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.RecordInfo).Property<System.DateTime?>(x => x.DtEdited).HasColumnName(@"DtEdited").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.RecordInfo).Property<string>(x => x.EditedBy).HasColumnName(@"EditedBy").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.RecordInfo).Property<bool?>(x => x.IsActive).HasColumnName(@"IsActive").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().OwnsOne(t => t.RecordInfo).Property<int?>(x => x.RecordOrder).HasColumnName(@"RecordOrder").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().Property<int>(x => x.CustStatusId).HasColumnName(@"CustStatusId").ValueGeneratedNever();
            modelBuilder.Entity<CustMain>().HasKey(@"Id");
        }

        partial void CustomizeCustMainMapping(ModelBuilder modelBuilder);

        #endregion

        #region CustStatus Mapping

        private void CustStatusMapping(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustStatus>().ToTable(@"CustStatuses");
            modelBuilder.Entity<CustStatus>().Property<int>(x => x.Id).HasColumnName(@"Id").IsRequired().ValueGeneratedOnAdd();
            modelBuilder.Entity<CustStatus>().OwnsOne(t => t.ReferenceInfo).Property<string>(x => x.Code).HasColumnName(@"Code").IsRequired().ValueGeneratedNever();
            modelBuilder.Entity<CustStatus>().OwnsOne(t => t.ReferenceInfo).Property<string>(x => x.Display).HasColumnName(@"Display").ValueGeneratedNever();
            modelBuilder.Entity<CustStatus>().OwnsOne(t => t.ReferenceInfo).Property<string>(x => x.Remarks).HasColumnName(@"Remarks").ValueGeneratedNever();
            modelBuilder.Entity<CustStatus>().OwnsOne(t => t.ReferenceInfo).Property<string>(x => x.OrderNo).HasColumnName(@"OrderNo").ValueGeneratedNever();
            modelBuilder.Entity<CustStatus>().OwnsOne(t => t.ReferenceInfo).Property<bool?>(x => x.IsActive).HasColumnName(@"IsActive").ValueGeneratedNever();
            modelBuilder.Entity<CustStatus>().OwnsOne(t => t.ReferenceInfo).Property<bool?>(x => x.IsDefault).HasColumnName(@"IsDefault").ValueGeneratedNever();
            modelBuilder.Entity<CustStatus>().HasKey(@"Id");
        }

        partial void CustomizeCustStatusMapping(ModelBuilder modelBuilder);

        #endregion

        private void RelationshipsMapping(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustMain>().HasOne(x => x.CustStatus).WithMany().IsRequired(true).HasForeignKey(@"CustStatusId");
        }

        partial void CustomizeMapping(ref ModelBuilder modelBuilder);

        public bool HasChanges()
        {
            return ChangeTracker.Entries().Any(e => e.State == Microsoft.EntityFrameworkCore.EntityState.Added || e.State == Microsoft.EntityFrameworkCore.EntityState.Modified || e.State == Microsoft.EntityFrameworkCore.EntityState.Deleted);
        }

        partial void OnCreated();
    }
}
