namespace AngularApp1.Server.DTOs
{
    public class JobMainListDto
    {
        public int Id { get; set; }
        public DateTime JobDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }
        public string LastEditBy { get; set; } = string.Empty;
        public DateTime LastEditOn { get; set; }
        public int? ItemStatusId { get; set; }
        public int? BusinessUnitId { get; set; }
        public string BusinessUnitName { get; set; } = string.Empty;
        public string PrimaryCustomerName { get; set; } = string.Empty;
        public string LatestStatusName { get; set; } = string.Empty;
        public int? Progress { get; set; }
    }
}
