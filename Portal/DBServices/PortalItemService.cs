using Erp.Domain.Models;
using Portal.DBLayer;

namespace Portal.DBServices
{
    public class PortalItemService : IPortalItemService
    {
        private readonly IPortalItemDbLayer _db;

        public PortalItemService(IPortalItemDbLayer db)
        {
            _db = db;
        }

        public async Task<List<PortalItem>> GetAllAsync()
        {
            return await _db.GetAllAsync();
        }

        public async Task<List<PortalItem>> SearchItemsAsync(string searchTerm)
        {
            return await _db.SearchItemsAsync(searchTerm);
        }

        public async Task<PortalItem?> GetByIdAsync(int id)
        {
            return await _db.GetByIdAsync(id);
        }

        public async Task UpdateAsync(PortalItem portalItem)
        {
            portalItem.LastEditOn = DateTime.UtcNow;
            await _db.UpdateAsync(portalItem);
        }

        public async Task<PortalItem> AddAsync(PortalItem portalItem)
        {
            portalItem.CreatedOn = DateTime.UtcNow;
            portalItem.LastEditOn = DateTime.UtcNow;
            portalItem.RecordGuid = Guid.NewGuid();
            return await _db.AddAsync(portalItem);
        }

        public async Task DeleteAsync(PortalItem portalItem)
        {
            await _db.DeleteAsync(portalItem);
        }

        public bool Exists(int id)
        {
            return _db.Exists(id);
        }
    }
}
