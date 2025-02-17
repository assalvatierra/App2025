using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;

namespace Erp.Application.Data
{
    public class ErpApplicationContext : DbContext
    {
        public ErpApplicationContext (DbContextOptions<ErpApplicationContext> options)
            : base(options)
        {
        }

        public DbSet<Erp.Domain.Models.Customer> Customer { get; set; } = default!;
    }
}
