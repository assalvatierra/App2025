using AngularApp1.Server.DBLayer;
using AngularApp1.Server.DTOs;
using Erp.Domain.Models;
using System.Text.Json;

namespace AngularApp1.Server.DBServices
{
    public class PortalReservationsService : IPortalReservationsService
    {
        private readonly IPortalReservationsDbLayer _db;
        private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public PortalReservationsService(IPortalReservationsDbLayer db)
        {
            _db = db;
        }

        private PortalReservationData? DeserializeReservationData(string? jsonData)
        {
            if (string.IsNullOrWhiteSpace(jsonData))
            {
                return null;
            }

            try
            {
                return JsonSerializer.Deserialize<PortalReservationData>(jsonData, JsonOptions);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<PortalReservation>> GetAllAsync()
        {
            return await _db.GetAllAsync();
        }

        public async Task<List<PortalReservationDto>> GetListAsync()
        {
            var reservations = await _db.GetAllAsync();
            return reservations.Select(r => new PortalReservationDto
            {
                Id = r.Id,
                TransactionType = r.TransactionType,
                PortalItemId = r.PortalItemId,
                CustomerName = r.CustomerName,
                ContactNo = r.ContactNo,
                ContactEmail = r.ContactEmail,
                DateReceived = r.DateReceived,
                Status = r.Status,
                ReservationData = DeserializeReservationData(r.JsonData)
            }).ToList();
        }

        public async Task<PortalReservation?> GetByIdAsync(int id)
        {
            return await _db.GetByIdAsync(id);
        }

        public async Task<PortalReservationDto?> GetByIdDtoAsync(int id)
        {
            var reservation = await _db.GetByIdAsync(id);
            if (reservation == null)
            {
                return null;
            }

            return new PortalReservationDto
            {
                Id = reservation.Id,
                TransactionType = reservation.TransactionType,
                PortalItemId = reservation.PortalItemId,
                CustomerName = reservation.CustomerName,
                ContactNo = reservation.ContactNo,
                ContactEmail = reservation.ContactEmail,
                DateReceived = reservation.DateReceived,
                Status = reservation.Status,
                ReservationData = DeserializeReservationData(reservation.JsonData)
            };
        }

        public async Task UpdateAsync(PortalReservation portalReservation)
        {
            await _db.UpdateAsync(portalReservation);
        }

        public async Task<PortalReservation> AddAsync(PortalReservation portalReservation)
        {
            return await _db.AddAsync(portalReservation);
        }

        public async Task DeleteAsync(PortalReservation portalReservation)
        {
            await _db.DeleteAsync(portalReservation);
        }

        public bool Exists(int id)
        {
            return _db.Exists(id);
        }
    }
}
