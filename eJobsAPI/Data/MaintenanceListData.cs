using eJobs.Model;

namespace eJobsAPI.Data
{
    public class MaintenanceListData
    {
        public int Id { get; set; }
        public string? Date { get; set; }
        public string? RecordType { get; set; }
        public string? Unit { get; set; }
        public int Odo { get; set; }
        public int NextOdo { get; set; }
        public string? NextSchedule { get; set; }
        public string? Remarks { get; set; }
    }
}
