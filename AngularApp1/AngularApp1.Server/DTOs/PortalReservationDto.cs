namespace AngularApp1.Server.DTOs
{
    public class PortalReservationDto
    {
        public int Id { get; set; }

        public string TransactionType { get; set; } = null!;

        public int? PortalItemId { get; set; }

        public string CustomerName { get; set; } = null!;

        public string? ContactNo { get; set; }

        public string? ContactEmail { get; set; }

        public DateTime DateReceived { get; set; }

        public PortalReservationData? ReservationData { get; set; }

        public string Status { get; set; } = null!;
    }
}
