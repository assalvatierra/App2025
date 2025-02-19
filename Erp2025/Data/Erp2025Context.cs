using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;

namespace Erp2025.Data
{
    public class Erp2025Context : DbContext
    {
        public Erp2025Context (DbContextOptions<Erp2025Context> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Customer>(t => {
                t.ToTable("Customers");
            });

            //builder.Entity<Customer>().ToTable("Customers");

        }
        public DbSet<Erp.Domain.Models.Customer> Customer { get; set; } = default!;
    }
}
