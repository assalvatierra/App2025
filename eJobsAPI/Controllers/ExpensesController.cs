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
        private readonly IExpensesServices _expensesServices;


        public ExpensesController(JobDbContext context, IExpensesServices expensesServices)
        {
            _context = context;
            _expensesServices = expensesServices;
        }


        // GET: api/Expenses/GetList
        [HttpGet("GetList")]
        public async Task<IEnumerable<ExpensesListData>> GetList()
        {

            return await _expensesServices.GetExpensesList();

        }



        // GET: api/Expenses/GetList
        [HttpGet("GetListByDate/{dateFrom}/{dateTo}")]
        public async Task<IEnumerable<ExpensesListData>> GetListByDate(DateTime dateFrom, DateTime dateTo)
        {

            return await _expensesServices.GetExpensesListByDate(dateFrom, dateTo);

        }




        // GET: api/Expenses/GetList
        [HttpGet("Search/{dateFrom}/{dateTo}/{options}")]
        public async Task<IEnumerable<ExpensesListData>> Search(DateTime dateFrom, DateTime dateTo, string options)
        {

            return await _expensesServices.Search(dateFrom, dateTo, options);

        }


        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApTransaction>> GetExpenses(int id)
        {
            var expenses = await _context.apTransactions.FindAsync(id);

            if (expenses == null)
            {
                return NotFound();
            }

            return expenses;
        }
    }
}
