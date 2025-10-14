using eJobs.Model;

namespace eJobsAPI.Data
{
    public class ReceivablesListData
    {
        public int Id { get; set; }
        public string? JobRef { get; set; }
        public string? Company { get; set; }
        public string? Contact { get; set; }
        public string? Service { get; set; }
        public string? Remarks { get; set; }
        public string? Status { get; set; }
        public string? InvoiceDate { get; set; }
        public string? DateStart { get; set; }
        public string? DateEnd { get; set; }
        public string? DueDate { get; set; }
        public decimal Amount { get; set; }
        public decimal Payment { get; set; }
        public decimal Balance { get; set; }
    }
}
