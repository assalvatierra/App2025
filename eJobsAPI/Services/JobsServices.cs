using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace eJobsAPI.Services
{
    public class JobsServices : IJobsServices
    {
        private readonly JobDbContext _context;

        public JobsServices(JobDbContext context)
        {
            _context = context;
        }

        private int JOBINQUIRY = 1;
        private int JOBRESERVATION = 2;
        private int JOBCONFIRMED = 3;

        public async Task<IEnumerable<JobQuickListData>> GetActiveJobs(DateTime DateFrom, DateTime DateTo)
        {
            var query = _context.JobServices
                .Include(js => js.Services)
                .Include(js => js.Supplier)
                .Include(j => j.JobMain)
                    .ThenInclude(j => j.Customer)
                .Include(js => js.JobMain)
                    .ThenInclude(j => j.JobStatus)
                .Include(js => js.JobServiceItems)
                    .ThenInclude(j => j.InvItem)
                .Include(j => j.JobServicePickups)

                .Where(d => (d.DtStart>= DateFrom && DateTo >= d.DtStart) 
                    && (
                        d.JobMain.JobStatusId == JOBRESERVATION 
                        || d.JobMain.JobStatusId == JOBCONFIRMED 
                        || d.JobMain.JobStatusId == JOBINQUIRY
                    )
                );

            var data = await query.ToListAsync();


            List<JobQuickListData> jobQuickLists = new List<JobQuickListData>();
            foreach (var job in data)
            {
                JobQuickListData jobQuickList = new JobQuickListData();
                jobQuickList.JobServiceId = job.Id;
                jobQuickList.JobMainId = job.JobMainId;
                jobQuickList.Remarks = job.Remarks;
                jobQuickList.ServiceType = job.Services.Name;
                jobQuickList.Particulars = job.Particulars;
                jobQuickList.Supplier = job.Supplier.Name;
                jobQuickList.JobStatus = job.JobMain.JobStatus.Status;
                jobQuickList.DateStart = job.DtStart?.ToString("MMM dd yyyy (ddd)") ?? "NA";
                jobQuickList.DateEnd = job.DtEnd?.ToString("MMM dd yyyy (ddd)") ?? "NA";

                jobQuickList.Contact = job.JobMain.Customer.Name ?? "";
                jobQuickList.Company = GetJobCompanyAssigned(job.JobMainId);

                jobQuickList.JobServiceItems = new List<string>();
                jobQuickList.JobServiceItems = job.JobServiceItems.Count > 0 ? job.JobServiceItems.Select(i => i.InvItem.Description).ToList() : new List<string>();
                
                jobQuickList.PickUpDetails = new List<JobPickUpData>();
                foreach (var pickup in job.JobServicePickups)
                {
                    JobPickUpData newPickup = new JobPickUpData();
                    newPickup.JsDate = pickup.JsDate; 
                    newPickup.JsTime = pickup.JsTime; 
                    newPickup.JsLocation = pickup.JsLocation; 
                    newPickup.ClientName = pickup.ClientName; 
                    newPickup.ClientContact = pickup.ClientContact; 
                    newPickup.ProviderName = pickup.ProviderName;
                    newPickup.ProviderContact = pickup.ProviderContact;

                    jobQuickList.PickUpDetails.Add(newPickup);
                }

                jobQuickLists.Add(jobQuickList);
            }

            return jobQuickLists;
        }



        protected DateTime GetCurrentTime()
        {
            DateTime _localTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Singapore Standard Time"));
            _localTime = _localTime.Date;

            return _localTime;
        }

        private string GetJobCompanyAssigned(int jobId)
        {

            string custCompany = "";
            //check customer if assigned to a company
            if (_context.JobEntMains.Where(c => c.JobMainId == jobId).FirstOrDefault() != null)
            {
                var company = _context.JobEntMains.Where(c => c.JobMainId == jobId).FirstOrDefault()?.CustEntMain;
                if (company != null)
                {
                    //hide company name if company is 1 = New (not defined)
                    if (company.Id == 1)
                    {
                        custCompany = " ";
                    }
                    else
                    {
                        custCompany = _context.JobEntMains.Where(c => c.JobMainId == jobId).FirstOrDefault()?.CustEntMain.Name ?? " ";
                    }
                }
              
            }

            return custCompany;
        }

    }
}
