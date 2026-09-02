using AngularApp1.Server.Data;
using Erp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.DBLayer
{
    public class PortalReservationsDbLayer : IPortalReservationsDbLayer
    {
        private readonly ErpDbContext _context;

        public PortalReservationsDbLayer(ErpDbContext context)
        {
            _context = context;
        }

        public async Task<List<PortalReservation>> GetAllAsync()
        {
            return await _context.PortalReservation.ToListAsync();
        }

        public async Task<PortalReservation?> GetByIdAsync(int id)
        {
            return await _context.PortalReservation.FirstOrDefaultAsync(pr => pr.Id == id);
        }

        public async Task UpdateAsync(PortalReservation portalReservation)
        {
            _context.PortalReservation.Update(portalReservation);
            await _context.SaveChangesAsync();
        }

        public async Task<PortalReservation> AddAsync(PortalReservation portalReservation)
        {
            _context.PortalReservation.Add(portalReservation);
            await _context.SaveChangesAsync();
            return portalReservation;
        }

        public async Task DeleteAsync(PortalReservation portalReservation)
        {
            _context.PortalReservation.Remove(portalReservation);
            await _context.SaveChangesAsync();
        }

        public bool Exists(int id)
        {
            return _context.PortalReservation.Any(pr => pr.Id == id);
        }
    }
}
