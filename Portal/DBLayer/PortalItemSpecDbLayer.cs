using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Portal.Data;

namespace Portal.DBLayer
{
    public class PortalItemSpecDbLayer : IPortalItemSpecDbLayer
    {
        private readonly ApplicationDbContext _context;

        public PortalItemSpecDbLayer(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PortalItemSpec>> GetAllAsync()
        {
            return await _context.PortalItemSpec
                .Include(s => s.PortalItem)
                .OrderBy(s => s.PortalItemId)
                .ThenBy(s => s.Order)
                .ToListAsync();
        }

        public async Task<List<PortalItemSpec>> GetByPortalItemIdAsync(int portalItemId)
        {
            return await _context.PortalItemSpec
                .Include(s => s.PortalItem)
                .Where(s => s.PortalItemId == portalItemId)
                .OrderBy(s => s.Order)
                .ToListAsync();
        }

        public async Task<PortalItemSpec?> GetByIdAsync(int id)
        {
            return await _context.PortalItemSpec
                .Include(s => s.PortalItem)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task UpdateAsync(PortalItemSpec portalItemSpec)
        {
            _context.Entry(portalItemSpec).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<PortalItemSpec> AddAsync(PortalItemSpec portalItemSpec)
        {
            _context.PortalItemSpec.Add(portalItemSpec);
            await _context.SaveChangesAsync();
            return portalItemSpec;
        }

        public async Task DeleteAsync(PortalItemSpec portalItemSpec)
        {
            _context.PortalItemSpec.Remove(portalItemSpec);
            await _context.SaveChangesAsync();
        }

        public bool Exists(int id)
        {
            return _context.PortalItemSpec.Any(e => e.Id == id);
        }
    }
}
