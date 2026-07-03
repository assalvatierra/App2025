using Erp.Domain.Models;
using Portal.DBLayer;
using Portal.Models;

namespace Portal.DBServices
{
    public class PortalItemService : IPortalItemService
    {
        private readonly IPortalItemDbLayer _db;
        private readonly IPortalItemSpecDbLayer _dbItemSpecs;

        public PortalItemService(IPortalItemDbLayer db, IPortalItemSpecDbLayer db2 )
        {
            _db = db;
            _dbItemSpecs = db2;
        }

        public async Task<List<PortalItem>> GetAllAsync()
        {
            return await _db.GetAllAsync();
        }

        public async Task<List<PortalItem>> SearchItemsAsync(SearchDto search)
        {
            List<int> itemIds = await _dbItemSpecs.GetItemIdsBySpecsCriteriaAsync(search);
            return await _db.SearchItemsAsync(search.searchTerm, itemIds);
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
