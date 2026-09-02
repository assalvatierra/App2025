namespace AngularApp1.Server.DTOs
{
    public class PortalReservationData
    {
        public string? PickupLocation { get; set; }

        public string? PickupInfo { get; set; }

        public DateTime? PickupDate { get; set; }

        public string? PickupTime { get; set; }

        public string? DestinationArea { get; set; }

        public string? DestinationInfo { get; set; }

        public int? NumberOfDays { get; set; }

        public decimal? CalculatedCost { get; set; }

        public decimal? BaseRate { get; set; }

        public string? BaseCurrency { get; set; }
    }
}
