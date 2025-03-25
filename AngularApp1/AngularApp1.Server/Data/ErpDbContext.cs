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
    }
}
