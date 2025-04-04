using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;

namespace AngularApp1.Server.Data
{
    public class ErpDbContext : DbContext
    {
        public ErpDbContext (DbContextOptions<ErpDbContext> options)
            : base(options)
        {
        }

        public DbSet<Erp.Domain.Models.RefCountry> RefCountry { get; set; } = default!;
        public DbSet<Erp.Domain.Models.RefCity> RefCity { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemType> ItemType { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemStatus> ItemStatus { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Contact> Contact { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Entity> Entity { get; set; } = default!;
        public DbSet<Erp.Domain.Models.BusinessUnit> BusinessUnit { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ServiceItem> ServiceItem { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobMain> JobMain { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobService> JobService { get; set; } = default!;
    }
}
