using eJobs.Model;

namespace eJobsAPI.Data
{
    public class MaintenanceSummaryData
    {
        public int Id { get; set; }
        public string? ItemCode { get; set; }
        public string? Description { get; set; }
        public int OrderNo { get; set; }
        public string? ImgPath { get; set; }
        public string? Remarks { get; set; }
        public int Odo { get; set; }

        public IEnumerable<InvCarRecord>? MntRecords { get; set; }
        public IEnumerable<InvCarMntRcmd>? Recommendations { get; set; }
    }
}
