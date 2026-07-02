using Erp.Domain.Models;
using Portal.DBLayer;

namespace Portal.DBServices
{
    public class PortalItemSpecService : IPortalItemSpecService
    {
        private readonly IPortalItemSpecDbLayer _db;

        public PortalItemSpecService(IPortalItemSpecDbLayer db)
        {
            _db = db;
        }

        public async Task<List<PortalItemSpec>> GetAllAsync()
        {
            return await _db.GetAllAsync();
        }

        public async Task<List<PortalItemSpec>> GetByPortalItemIdAsync(int portalItemId)
        {
            return await _db.GetByPortalItemIdAsync(portalItemId);
        }

        public async Task<PortalItemSpec?> GetByIdAsync(int id)
        {
            return await _db.GetByIdAsync(id);
        }

        public async Task UpdateAsync(PortalItemSpec portalItemSpec)
        {
            await _db.UpdateAsync(portalItemSpec);
        }

        public async Task<PortalItemSpec> AddAsync(PortalItemSpec portalItemSpec)
        {
            return await _db.AddAsync(portalItemSpec);
        }

        public async Task DeleteAsync(PortalItemSpec portalItemSpec)
        {
            await _db.DeleteAsync(portalItemSpec);
        }

        public bool Exists(int id)
        {
            return _db.Exists(id);
        }
    }
}
