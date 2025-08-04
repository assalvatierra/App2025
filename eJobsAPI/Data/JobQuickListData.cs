namespace eJobsAPI.Data
{
    public class JobQuickListData
    {
        public int JobServiceId { get; set; }
        public int JobMainId   { get; set; }
        public string? ServiceType { get; set; }
        public string? Particulars { get; set; }
        public Decimal Amount  { get; set; }
        public string? Remarks { get; set; }
        public string? DateStart { get; set; }
        public string? DateEnd { get; set; }
        public string? Company { get; set; }
        public string? Contact { get; set; }
        public string? JobStatus { get; set; }
        public List<JobPickUpData>? PickUpDetails { get; set; }
        public List<string>? JobServiceItems { get; set; }
        public string? Supplier { get; set; }
    }

    public class JobPickUpData
    {
        public int JobServiceId { get; set; }
        public DateTime JsDate { get; set; }
        public string? JsTime { get; set; }
        public string? JsLocation { get; set; }
        public string? ClientName { get; set; }
        public string? ClientContact { get; set; }
        public string? ProviderName { get; set; }
        public string? ProviderContact { get; set; }

    }
}
