using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
            List<ReceivablesListData> listData = new List<ReceivablesListData>();

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

                    listData.Add(ardata);
                };
            }


            return listData;
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
    }
}
