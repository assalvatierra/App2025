using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using eJobs.Model;

namespace eJobs.Data
{
    public class JobDbContext : DbContext
    {
        public JobDbContext (DbContextOptions<JobDbContext> options)
            : base(options)
        {
        }
        public DbSet<eJobs.Model.CrLogTrip> CrLogTrips { get; set; } = default!;
        public DbSet<eJobs.Model.CrLogUnit> CrLogUnits { get; set; } = default!;
        public DbSet<eJobs.Model.CrLogDriver> CrLogDrivers { get; set; } = default!;
        public DbSet<eJobs.Model.CrLogCompany> CrLogCompanies { get; set; } = default!;
        public DbSet<eJobs.Model.CrLogTripJobMain> CrLogTripJobMains { get; set; } = default!;

    }
}
