namespace Portal.Models
{
    public class ReservationAdditionalInfo
    {
        public string? PickupLocation { get; set; }

        public DateTime? PickupDate { get; set; }

        public TimeSpan? PickupTime { get; set; }

        public int? NumberOfDays { get; set; }

    }
}
