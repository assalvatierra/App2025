using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using eJobsAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace eJobsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {


        private readonly JobDbContext _context;
        private readonly IReceivablesServices _receivablesServices;


        public ExpensesController(JobDbContext context, IReceivablesServices receivablesServices)
        {
            _context = context;
            _receivablesServices = receivablesServices;
        }


        // GET: api/Expenses/GetList
        [HttpGet("GetList")]
        public ActionResult<IEnumerable<ExpensesListData>> GetList()
        {

            var today = DateTime.Today;

            var expensesList = _context
                .apTransactions
                .Include(ap => ap.ApAccount)
                .Include(ap => ap.ApTransCategory)
                .Include(ap => ap.ApTransStatus)
                .Include(ap => ap.ApTransPayments)
                .Where(ap=>ap.DtInvoice == today).ToList();



            return FilteredData(expensesList);

        }



        // GET: api/Expenses/GetList
        [HttpGet("GetListByDate/{dateFrom}/{dateTo}")]
        public ActionResult<IEnumerable<ExpensesListData>> GetListByDate(DateTime dateFrom, DateTime dateTo)
        {
            var DbF = EF.Functions;
            var expensesList = _context
                .apTransactions
                .Include(ap => ap.ApAccount)
                .Include(ap => ap.ApTransCategory)
                .Include(ap => ap.ApTransStatus)
                .Include(ap => ap.ApTransPayments)
                .Where(ap => ap.DtInvoice >= dateFrom && ap.DtInvoice <= dateTo).ToList();


            return FilteredData(expensesList);

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
                exp.Payment = expenses.ApTransPayments.Sum(p => p.ApPayments == null ? 0: p.ApPayments.Amount);
                exp.Category = expenses.ApTransCategory.Name;
                exp.Status = expenses.ApTransStatus.Status;

                expensesListData.Add(exp);

            }

            return expensesListData;

        }

    }
}
