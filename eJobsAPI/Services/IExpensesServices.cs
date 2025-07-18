using eJobsAPI.Data;

namespace eJobsAPI.Services
{
    public interface IExpensesServices
    {
        public Task<IEnumerable<ExpensesListData>> GetExpensesList();
        public Task<IEnumerable<ExpensesListData>> GetExpensesListByDate(DateTime dateFrom, DateTime dateTo);

        public Task<IEnumerable<ExpensesListData>> Search(DateTime dateFrom, DateTime dateTo, string options);
    }
}
