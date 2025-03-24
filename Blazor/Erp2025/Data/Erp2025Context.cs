using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;
//using Erp.Domain.Models;

namespace Erp2025.Data
{
    public partial class Erp2025Context : DbContext
    {
        public Erp2025Context (DbContextOptions<Erp2025Context> options)
            : base(options)
        {
        }
        public DbSet<Erp.Domain.Models.RefCountry> RefCountry { get; set; } = default!;
        public DbSet<Erp.Domain.Models.RefCity> RefCity { get; set; } = default!;
        public DbSet<Erp.Domain.Models.BusinessUnit> BusinessUnit { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Contact> Contact { get; set; } = default!;
        public DbSet<Erp.Domain.Models.Entity> Entity { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ServiceItem> ServiceItem { get; set; } = default!;
        public DbSet<Erp.Domain.Models.JobMain> JobMain { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemType> ItemType { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemTypeClass> ItemTypeClass { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemStatus> ItemStatus { get; set; } = default!;
        public DbSet<Erp.Domain.Models.ItemStatusClass> ItemStatusClass { get; set; }
        

    }
}
