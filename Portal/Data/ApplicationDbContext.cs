using Erp.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Portal.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext(options)
    {
        public DbSet<PortalItem> PortalItem { get; set; } = default!;
        public DbSet<PortalItemSpec> PortalItemSpec { get; set; } = default!;
        public DbSet<PortalReservation> PortalReservation { get; set; } = default!;
        public DbSet<PortalCategory> PortalCategory { get; set; } = default!;
        public DbSet<PortalItemCategory> PortalItemCategory { get; set; } = default!;
    }
}
