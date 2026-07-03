using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Portal.Data;

namespace Portal.DBLayer
{
    public class PortalItemDbLayer : IPortalItemDbLayer
    {
        private readonly ApplicationDbContext _context;

        public PortalItemDbLayer(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PortalItem>> GetAllAsync()
        {
            return await _context.PortalItem.ToListAsync();
        }

        public async Task<List<PortalItem>> SearchItemsAsync(string searchTerm, List<int> itemIds)
        {
            var query = _context.PortalItem
                .Where(p => !p.IsArchived && p.IsActive);

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(p => 
                        (p.IsActive && !p.IsArchived) &&
                        (
                            (p.Name.Contains(searchTerm)) || 
                            (p.Description != null && p.Description.Contains(searchTerm)) ||
                            (p.Code != null && p.Code.Contains(searchTerm))
                         )
                    );
            }

            if (itemIds != null && itemIds.Count > 0)
            {
                query = query.Where(p => itemIds.Contains(p.Id));
            }

            return await query
                .OrderBy(p => p.SortOrder ?? int.MaxValue)
                .ThenBy(p => p.Name)
                .ToListAsync();
        }

        public async Task<PortalItem?> GetByIdAsync(int id)
        {
            return await _context.PortalItem.FindAsync(id);
        }

        public async Task UpdateAsync(PortalItem portalItem)
        {
            _context.Entry(portalItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<PortalItem> AddAsync(PortalItem portalItem)
        {
            _context.PortalItem.Add(portalItem);
            await _context.SaveChangesAsync();
            return portalItem;
        }

        public async Task DeleteAsync(PortalItem portalItem)
        {
            _context.PortalItem.Remove(portalItem);
            await _context.SaveChangesAsync();
        }

        public bool Exists(int id)
        {
            return _context.PortalItem.Any(e => e.Id == id);
        }
    }
}
