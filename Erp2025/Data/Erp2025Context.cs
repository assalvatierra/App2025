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


    }
}
