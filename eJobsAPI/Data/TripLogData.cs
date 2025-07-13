namespace eJobsAPI.Data
{
    public class TripLogData
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string jobRef { get; set; }
        public string Unit { get; set; }
        public string Driver { get; set; }
        public string Company { get; set; }
        public string Remarks { get; set; }
        public decimal RentalRate { get; set; }
        public decimal Addon { get; set; }
        public decimal OT { get; set; }
        public decimal Expenses { get; set; }
        public decimal DriversFee { get; set; }
        public decimal DriverOT { get; set; }
        public string Time { get; set; }
    }
}
