using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
namespace eJobsAPI.Services
{
    public class ReceivablesServices : IReceivablesServices
    {
        private readonly JobDbContext _context;


        int STATUS_NEW = 1;
        int STATUS_APPROVAL = 2;
        int STATUS_APPROVED = 3;
        int STATUS_BILLINGSENT = 4;
        private int STATUS_CLOSED = 6;
        private int STATUS_SETTLEMENT = 5;
        private int STATUS_CANCELLED = 7;

        public ReceivablesServices(JobDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<ReceivablesListData>>> GetReceivablesList()
        {

            var receivables = await _context.ArTransactions
                .Include(ar => ar.ArAccount)
                .ThenInclude(ar => ar.ArAccContacts)
                .Include(ar => ar.ArTransPayments)
                .Include(ar => ar.ArTransStatus)
                .Include(ar => ar.ArTransPayments)
                .ThenInclude(ar => ar.ArPayment)
                .Where(ar => ar.ArTransStatusId == STATUS_APPROVAL || ar.ArTransStatusId == STATUS_APPROVED || ar.ArTransStatusId == STATUS_BILLINGSENT)
                .OrderByDescending(ar => ar.DtInvoice)
                .ToListAsync();



            return FilteredData(receivables);
        }

        

        private List<ReceivablesListData> FilteredData(List<ArTransaction> receivables)
        {

            List<ReceivablesListData> arListData = new List<ReceivablesListData>();

            if (receivables != null || receivables.Count != 0)
            {

                foreach (var ar in receivables)
                {
                    ReceivablesListData ardata = new ReceivablesListData();
                    ardata.Id = ar.Id;
                    ardata.JobRef = ar.InvoiceRef ?? "";
                    ardata.Service = ar.Description;
                    ardata.Remarks = ar.Remarks ?? "";
                    ardata.InvoiceDate = ar.DtInvoice.ToString("MMM dd yyyy");
                    ardata.DateStart = ar.DtService.ToString("MMM dd yyyy");
                    ardata.DateEnd = ar.DtServiceTo?.ToString("MMM dd yyyy");
                    ardata.DueDate = ar.DtDue.ToString("MMM dd yyyy");
                    ardata.Company = ar.ArAccount.Company;
                    ardata.Contact = GetContactName(ar.ArAccContactId);
                    ardata.Status = ar.ArTransStatus.Status;
                    ardata.Amount = ar.Amount;
                    ardata.Payment = GetTotalPayments(ar.ArTransPayments);
                    ardata.Balance = ar.Amount - GetTotalPayments(ar.ArTransPayments);

                    arListData.Add(ardata);
                };
            }



            return arListData;

        }



        private decimal GetTotalPayments(ICollection<ArTransPayment> arTransPayment)
        {
            decimal totalPayment = 0;
            if (arTransPayment == null)
            {
                return totalPayment;
            }

            foreach (var arPayment in arTransPayment)
            {
                if (arPayment != null)
                {
                    totalPayment += arPayment.ArPayment.Amount;
                }
            }

            return totalPayment;
        }

        private string GetContactName(int arContactId)
        {
            if (arContactId != 0)
            {
                var contact = _context.ArAccContacts.FirstOrDefault(c => c.Id == arContactId);
                if (contact != null)
                {
                    return contact.Name;
                }

            }
            return "";
        }

        public async Task<IEnumerable<ReceivablesListData>> GetReceivablesList(DateTime dateFrom, DateTime dateTo)
        {

            var receivables = await _context.ArTransactions
                .Include(ar => ar.ArAccount)
                .ThenInclude(ar => ar.ArAccContacts)
                .Include(ar => ar.ArTransPayments)
                .Include(ar => ar.ArTransStatus)
                .Include(ar => ar.ArTransPayments)
                .ThenInclude(ar => ar.ArPayment)
                .Where(ar => (ar.ArTransStatusId == STATUS_APPROVAL || ar.ArTransStatusId == STATUS_APPROVED || ar.ArTransStatusId == STATUS_BILLINGSENT)
                          && (ar.DtInvoice >= dateFrom && ar.DtInvoice <= dateTo))
                .OrderByDescending(ar => ar.DtInvoice)
                .ToListAsync();

            return await Task.FromResult(FilteredData(receivables));
        }

        public async Task<IEnumerable<ReceivablesListData>> Search(DateTime dateFrom, DateTime dateTo, string options = null)
        {

            var query = _context.ArTransactions
                .Include(ar => ar.ArAccount)
                .ThenInclude(ar => ar.ArAccContacts)
                .Include(ar => ar.ArTransPayments)
                .Include(ar => ar.ArTransStatus)
                .Include(ar => ar.ArTransPayments)
                .ThenInclude(ar => ar.ArPayment)
                .Where(ar=>(ar.DtInvoice >= dateFrom && ar.DtInvoice <= dateTo)  );


            var parsedOptions = ParseOptions(options);
            if (parsedOptions.ContainsKey("company"))
            {
                query = query.Where(t => 
                       ( t.ArAccount.Company != null ) 
                    && ( t.ArAccount.Company.Contains(parsedOptions["company"]) || t.ArAccount.Name.Contains(parsedOptions["company"]) )
                );
            }
            //if (parsedOptions.ContainsKey("clientname")) //implement in the future
            //{
            //    query = query.Where(t => t.ArAccount.Name.Contains(parsedOptions["clientname"]));

                    //var arWithJob = _context.ArTransactions
                    //.Select(ar => new {
                    //    Ar = ar,
                    //    Job = _context.JobMains.FirstOrDefault(j => j.Id.ToString() == ar.InvoiceRef)
                    //})
                    //.ToList();
            //}

            if (parsedOptions.ContainsKey("description"))
            {
                query = query.Where(t => t.Description.Contains(parsedOptions["description"]));
            }
            if (parsedOptions.ContainsKey("remarks"))
            {
                query = query.Where(t => (t.Remarks != null) && t.Remarks.Contains(parsedOptions["remarks"]));
            }
            if (parsedOptions.ContainsKey("status"))
            {
                query = query.Where(t => (t.ArTransStatus.Status != null) && t.ArTransStatus.Status.Contains(parsedOptions["status"]));
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
