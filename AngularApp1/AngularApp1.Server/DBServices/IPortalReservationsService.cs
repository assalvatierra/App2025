using AngularApp1.Server.DTOs;
using Erp.Domain.Models;

namespace AngularApp1.Server.DBServices
{
    public interface IPortalReservationsService
    {
        Task<List<PortalReservation>> GetAllAsync();
        Task<List<PortalReservationDto>> GetListAsync();
        Task<PortalReservation?> GetByIdAsync(int id);
        Task<PortalReservationDto?> GetByIdDtoAsync(int id);
        Task UpdateAsync(PortalReservation portalReservation);
        Task<PortalReservation> AddAsync(PortalReservation portalReservation);
        Task DeleteAsync(PortalReservation portalReservation);
        bool Exists(int id);
    }
}
