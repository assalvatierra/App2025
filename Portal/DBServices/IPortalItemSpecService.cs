using Erp.Domain.Models;

namespace Portal.DBServices
{
    public interface IPortalItemSpecService
    {
        Task<List<PortalItemSpec>> GetAllAsync();
        Task<List<PortalItemSpec>> GetByPortalItemIdAsync(int portalItemId);
        Task<PortalItemSpec?> GetByIdAsync(int id);
        Task UpdateAsync(PortalItemSpec portalItemSpec);
        Task<PortalItemSpec> AddAsync(PortalItemSpec portalItemSpec);
        Task DeleteAsync(PortalItemSpec portalItemSpec);
        bool Exists(int id);
    }
}
