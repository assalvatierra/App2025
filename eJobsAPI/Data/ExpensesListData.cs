namespace eJobsAPI.Data
{
    public class ExpensesListData
    {
        public int Id { get; set; }
        public string? Account { get; set; }
        public string? Description { get; set; }
        public string? Remarks { get; set; }
        public decimal? Requested { get; set; }
        public decimal? Released { get; set; }
        public decimal Amount { get; set; }
        public decimal Payment { get; set; }
        public string? Date { get; set; }
        public string? Category { get; set; }
        public string? Status { get; set; }
    }
}
