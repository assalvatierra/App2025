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

        public async Task<ActionResult<IList<JobMain>>> GetActiveJobs()
        {
            DateTime dtFrom = System.DateTime.Today;
            DateTime dtTo = System.DateTime.Today.AddDays(2);

            List<JobMain> jobMains = await _context.JobMains
                .Include(j => j.Customer)
                //.Include(j => j.Branch)
                .Include(j => j.JobStatus)
                //.Include(j => j.JobThru)
                .Include(j => j.JobStatus)
                .Include(j => j.JobServices)
                    .ThenInclude(js => js.JobServiceItems)
                    .ThenInclude(js => js.InvItem)
                .Include(j => j.JobServices)
                    .ThenInclude(js => js.Services)
                .Include(j => j.JobServices)
                    .ThenInclude(js => js.JobServicePickups)
                .Include(j => j.JobServices)
                    .ThenInclude(js => js.Supplier)
                .Where(d => d.JobStatusId == JOBRESERVATION || d.JobStatusId == JOBCONFIRMED || d.JobStatusId == JOBINQUIRY)
                .Where(j => j.JobServices.Any(js => js.DtStart.HasValue &&
                                                    js.DtStart.Value.Date >= dtFrom &&
                                                    js.DtStart.Value.Date <= dtTo))

                .OrderBy(d => d.JobDate)
                .ToListAsync();

            return new ActionResult<IList<JobMain>>(jobMains);

            //return Ok(jobMains);

            ////get jobs from today to 2 days after
            //data = data.Where(w => DateTime.Compare(w.DtStart.Value.Date, after2Days.Date) <= 0 && DateTime.Compare(w.DtStart.Value.Date, today.Date) >= 0)
            //    .OrderBy(s => s.DtStart).ToList();


            //jobMains = jobMains.Where(d => d.JobStatusId == JOBRESERVATION || d.JobStatusId == JOBCONFIRMED || d.JobStatusId == JOBINQUIRY);

            //var p = jobMains.Select(s => s.Id);

            //DateTime today = GetCurrentTime();

            //List<JobService> data = _context.JobServices
            //    .Include(j => j.JobMain)
            //    .ThenInclude(j => j.Customer)
            //    .Include(j => j.JobServiceItems)
            //    .ThenInclude(j => j.InvItem)
            //    .Include(j => j.JobServicePickups)
            //    .Include(j => j.Services)
            //    .Include(j => j.Supplier)
            //    .Where(w => p.Contains(w.JobMainId)).ToList().OrderBy(s => s.DtStart).ToList();

            //DateTime tomorrow = today.AddDays(1);
            //DateTime after2Days = today.AddDays(2);

            ////get jobs from today to 2 days after
            //data = data.Where(w => DateTime.Compare(w.DtStart.Value.Date, after2Days.Date) <= 0 && DateTime.Compare(w.DtStart.Value.Date, today.Date) >= 0)
            //    .OrderBy(s => s.DtStart).ToList();


            //List<JobQuickListData> jobQuickLists = new List<JobQuickListData>();
            //foreach (var job in data)
            //{
            //    JobQuickListData jobQuickList = new JobQuickListData();
            //    jobQuickList.JobServiceId = job.Id;
            //    jobQuickList.JobMainId = job.JobMainId;
            //    jobQuickList.Remarks = job.Remarks;
            //    jobQuickList.Service = job.Services.Name;
            //    jobQuickList.Supplier = job.Supplier.Name;

            //    jobQuickList.DateStart = job.DtStart?.ToString("MMM dd yyyy (ddd)") ?? "NA";
            //    jobQuickList.DateEnd = job.DtEnd?.ToString("MMM dd yyyy (ddd)") ?? "NA";

            //    jobQuickList.Contact = job.JobMain.Customer.Name ?? "";
            //    jobQuickList.Company = GetJobCompanyAssigned(job.JobMainId);

            //    jobQuickList.JobServiceItems = new List<string>();
            //    jobQuickList.JobServiceItems = job.JobServiceItems.Count > 0 ? job.JobServiceItems.Select(i=>i.InvItem.Description).ToList(): new List<string>();
            //    jobQuickList.PickUpDetails = new List<JobPickUpData>();

            //    foreach (var pickup in job.JobServicePickups)
            //    {
            //        JobPickUpData newPickup = new JobPickUpData();
            //        newPickup.Contact = pickup.ClientContact ?? "";
            //        newPickup.Address = pickup.JsLocation ?? "";
            //        newPickup.Date =  pickup.JsDate.ToShortDateString() ?? "";
            //        newPickup.Time = pickup.JsTime ?? "";
            //    }

            //    jobQuickLists.Add(jobQuickList);
            //}

            //return jobQuickLists;
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
