using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace eJobsAPI.Services
{
    public class ExpensesServices : IExpensesServices
    {
        private readonly JobDbContext _context;
        public ExpensesServices(JobDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ExpensesListData>> GetExpensesList()
        {
            var today = GetCurrentTime();

            var apTransactions = await _context.apTransactions
                .Include(ap => ap.ApAccount)
                .Include(ap => ap.ApTransCategory)
                .Include(ap => ap.ApTransStatus)
                .Include(ap => ap.ApTransPayments)
                .Where(ap => ap.DtInvoice.Date == today.Date).ToListAsync();

            return await Task.FromResult(FilteredData(apTransactions));
        }


        public async Task<IEnumerable<ExpensesListData>> GetExpensesListByDate(DateTime dateFrom, DateTime dateTo)
        {
            var DbF = EF.Functions;
            var apTransactions = _context.apTransactions
                .Include(ap => ap.ApAccount)
                .Include(ap => ap.ApTransCategory)
                .Include(ap => ap.ApTransStatus)
                .Include(ap => ap.ApTransPayments)
                .Where(ap => ap.DtInvoice >= dateFrom && ap.DtInvoice <= dateTo).ToList();


            return await Task.FromResult(FilteredData(apTransactions));
        }





        private List<ExpensesListData> FilteredData(List<ApTransaction> apTransactions)
        {

            List<ExpensesListData> expensesListData = new List<ExpensesListData>();

            foreach (var expenses in apTransactions)
            {
                ExpensesListData exp = new ExpensesListData();
                exp.Id = expenses.Id;
                exp.Date = expenses.DtInvoice.ToString("MMM dd yyyy");
                exp.Account = expenses.ApAccount.Name;
                exp.Description = expenses.Description;
                exp.Remarks = expenses.Remarks;
                exp.Requested = expenses.BudgetAmt;
                exp.Released = expenses.ReleaseAmt;
                exp.Amount = expenses.Amount;
                exp.Payment = expenses.ApTransPayments.Sum(p => p.ApPayments == null ? 0 : p.ApPayments.Amount);
                exp.Category = expenses.ApTransCategory.Name;
                exp.Status = expenses.ApTransStatus.Status;

                expensesListData.Add(exp);

            }

            return expensesListData;

        }


        protected DateTime GetCurrentTime()
        {
            DateTime _localTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Singapore Standard Time"));
            _localTime = _localTime.Date;

            return _localTime;
        }

        public async Task<IEnumerable<ExpensesListData>> Search(DateTime dateFrom, DateTime dateTo, string options = null)
        {
            var query = _context.apTransactions
                .Include(ap => ap.ApAccount)
                .Include(ap => ap.ApTransCategory)
                .Include(ap => ap.ApTransStatus)
                .Include(ap => ap.ApTransPayments)
                .Where(ap => ap.DtInvoice >= dateFrom && ap.DtInvoice <= dateTo);


            var parsedOptions = ParseOptions(options);
            if (parsedOptions.ContainsKey("account"))
            {
                query = query.Where(t => (t.ApAccount.Name != null) && t.ApAccount.Name.Contains(parsedOptions["account"]));
            }
            if (parsedOptions.ContainsKey("description"))
            {
                query = query.Where(t => t.Description.Contains(parsedOptions["description"]));
            }
            if (parsedOptions.ContainsKey("remarks"))
            {
                query = query.Where(t => (t.Remarks != null) && t.Remarks.Contains(parsedOptions["remarks"]));
            }

            var expenses = await query.ToListAsync();
            return this.FilteredData(expenses);
        }


        private Dictionary<string, string> ParseOptions(string options)
        {
            var parsedOptions = new Dictionary<string, string>();

            if (!string.IsNullOrEmpty(options))
            {
                var optionsArray = options.Split(';');

                foreach (var option in optionsArray)
                {
                    var keyValue = option.Split('=');

                    if (keyValue.Length == 2)
                    {
                        parsedOptions.Add(keyValue[0].Trim(), keyValue[1].Trim());
                    }
                }
            }

            return parsedOptions;
        }
    }
}
