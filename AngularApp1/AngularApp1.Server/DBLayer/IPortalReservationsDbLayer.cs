using Erp.Domain.Models;

namespace AngularApp1.Server.DBLayer
{
    public interface IPortalReservationsDbLayer
    {
        Task<List<PortalReservation>> GetAllAsync();
        Task<PortalReservation?> GetByIdAsync(int id);
        Task UpdateAsync(PortalReservation portalReservation);
        Task<PortalReservation> AddAsync(PortalReservation portalReservation);
        Task DeleteAsync(PortalReservation portalReservation);
        bool Exists(int id);
    }
}
