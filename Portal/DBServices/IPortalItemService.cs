using Erp.Domain.Models;
using Portal.Models;

namespace Portal.DBServices
{
    public interface IPortalItemService
    {
        Task<List<PortalItem>> GetAllAsync();
        Task<List<PortalItem>> SearchItemsAsync(SearchDto search);
        Task<PortalItem?> GetByIdAsync(int id);
        Task UpdateAsync(PortalItem portalItem);
        Task<PortalItem> AddAsync(PortalItem portalItem);
        Task DeleteAsync(PortalItem portalItem);
        bool Exists(int id);
    }
}
