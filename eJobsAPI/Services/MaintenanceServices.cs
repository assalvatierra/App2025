using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Data;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace eJobsAPI.Services
{
    public class MaintenanceServices : IMaintenanceServices
    {
        private readonly JobDbContext _context;
        public MaintenanceServices(JobDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MaintenanceListData>> GetList()
        {

            var records = await _context.InvCarRecords
                .Include(x => x.InvItem)
                .Include(x => x.InvCarRecordType)
                .OrderByDescending(x=>x.DtDone)
                .Take(10).ToListAsync();

            return await Task.FromResult(FilterData(records));
        }


        public async Task<IEnumerable<MaintenanceListData>> GetListByDate(DateTime dateFrom, DateTime dateTo)
        {
            var records =  await _context.InvCarRecords
                .Include(x => x.InvItem)
                .Include(x => x.InvCarRecordType)
                .Where(x => x.DtDone >= dateFrom && x.DtDone <= dateTo)
                .ToListAsync();

            return await Task.FromResult(FilterData(records));
        }



        public async Task<IEnumerable<MaintenanceListData>> Search(DateTime dateFrom, DateTime dateTo, string options = null)
        {
            var query = _context.InvCarRecords
                .Include(x => x.InvItem)
                .Include(x => x.InvCarRecordType)
                .Where(x => 
                    (x.DtDone >= dateFrom && x.DtDone <= dateTo)
                    && (!string.IsNullOrEmpty(x.InvItem.ViewLabel) && x.InvItem.ViewLabel.Trim().ToUpper()=="UNIT")
                    && (x.InvItem.OrderNo!=null && x.InvItem.OrderNo <= 100)
                );

            
            var parsedOptions = ParseOptions(options);
            if (parsedOptions.ContainsKey("unit"))
            {
                query = query.Where(t => (t.InvItem.Description != null) && (t.InvItem.Description.Contains(parsedOptions["unit"])));
            }
            if (parsedOptions.ContainsKey("plate"))
            {
                query = query.Where(t => (t.InvItem.ItemCode != null) && (t.InvItem.ItemCode.Contains(parsedOptions["plate"])));
            }
            if (parsedOptions.ContainsKey("recordtype"))
            {
                query = query.Where(t => (t.InvCarRecordType.Description != null) && t.InvCarRecordType.Description.Contains(parsedOptions["recordtype"]));
            }
            if (parsedOptions.ContainsKey("remarks"))
            {
                query = query.Where(t => (t.Remarks != null) && t.Remarks.Contains(parsedOptions["remarks"]));
            }

            var records = await query.ToListAsync();

            return FilterData(records);
        }



        protected DateTime GetCurrentTime()
        {
            DateTime _localTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Singapore Standard Time"));
            _localTime = _localTime.Date;

            return _localTime;
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


        private List<MaintenanceListData> FilterData(List<InvCarRecord> records) 
        {

            List<MaintenanceListData> arListData = new List<MaintenanceListData>();

            if (records != null || records.Count > 0)
            {

                foreach (var ar in records)
                {
                    MaintenanceListData ardata = new MaintenanceListData();
                    ardata.Id = ar.Id;
                    ardata.Date = ar.DtDone.ToShortDateString();
                    ardata.RecordType = ar.InvCarRecordType.Description;
                    ardata.Unit = ar.InvItem.ItemCode + " " + ar.InvItem.Description;
                    ardata.Odo = ar.Odometer;
                    ardata.NextOdo = ar.NextOdometer;
                    ardata.NextSchedule = ar.NextSched.ToShortDateString();
                    ardata.Remarks = ar.Remarks;

                    arListData.Add(ardata);
                };
            }



            return arListData;

        }

    }
}
