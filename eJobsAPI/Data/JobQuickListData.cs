namespace eJobsAPI.Data
{
    public class JobQuickListData
    {
        public int JobServiceId { get; set; }
        public int JobMainId   { get; set; }
        public string? Service { get; set; }
        public Decimal Amount  { get; set; }
        public string? Remarks { get; set; }
        public string? DateStart { get; set; }
        public string? DateEnd { get; set; }
        public string? Company { get; set; }
        public string? Contact { get; set; }
        public List<JobPickUpData>? PickUpDetails { get; set; }
        public List<string>? JobServiceItems { get; set; }
        public string? Supplier { get; set; }
    }

    public class JobPickUpData
    {
        public int JobServiceId { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}
