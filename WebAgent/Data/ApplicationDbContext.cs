using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Erp.Domain.Models;

namespace WebAgent.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Erp.Domain.Models.Agent> Agent { get; set; } = default!;
        public DbSet<Erp.Domain.Models.AgentBin> AgentBin { get; set; } = default!;
        public DbSet<Erp.Domain.Models.AgentInstruction> AgentInstruction { get; set; } = default!;
    }
}
