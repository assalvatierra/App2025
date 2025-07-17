using eJobs.Data;
using eJobsAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace eJobsAPI.Services
{
    public class TripLogServices : ITripLogServices
    {
        private readonly JobDbContext _context;

        public TripLogServices(JobDbContext context)
        {
            _context = context;
        }

        public async Task<List<TripLogData>> Search(System.DateTime dtFrom, System.DateTime dtTo, string options = null)
        {
            var DbF = EF.Functions;

            var query = _context.CrLogTrips
                .Include(t => t.CrLogTripJobMains)
                .Include(t => t.CrLogUnit)
                .Include(t => t.CrLogDriver)
                .Include(t => t.CrLogCompany)
                .Where(t => t.DtTrip.Date >= dtFrom.Date && t.DtTrip.Date <= dtTo.Date);

            var parsedOptions = ParseOptions(options);
            if (parsedOptions.ContainsKey("company"))
            {
                query = query.Where(t => (t.CrLogCompany.Name != null) && t.CrLogCompany.Name.Contains(parsedOptions["company"]));
            }
            if (parsedOptions.ContainsKey("driver"))
            {
                query = query.Where(t => t.CrLogDriver.Name.Contains(parsedOptions["driver"]));
            }
            if (parsedOptions.ContainsKey("remarks"))
            {
                query = query.Where(t => (t.Remarks != null) && t.Remarks.Contains(parsedOptions["remarks"]));
            }

            var triplogList = await query.ToListAsync();
            return this.toTripLogData(triplogList);

        }


        public async Task<List<TripLogData>> GetTripLogsByDate(System.DateTime DateTripFrom, System.DateTime DateTripTo)
        {
            var DbF = EF.Functions;

            var triplogList = await _context.CrLogTrips
                .Include(t => t.CrLogTripJobMains)
                .Include(t => t.CrLogUnit)
                .Include(t => t.CrLogDriver)
                .Include(t => t.CrLogCompany)
                .Where(t => t.DtTrip.Date >= DateTripFrom.Date && t.DtTrip.Date <= DateTripTo.Date)
                //.Where(t => DbF.DateDiffDay(DateTripFrom, t.DtTrip ) >= 0 && DbF.DateDiffDay(t.DtTrip, DateTripTo) >= 0)
                .ToListAsync();

            return this.toTripLogData(triplogList);
        }

        public async Task<List<TripLogData>> GetTripLogsToday()
        {
            return  await this.GetTripLogsByDate(DateTime.Today, DateTime.Today);
        }

        private List<TripLogData> toTripLogData(List<eJobs.Model.CrLogTrip> triplogList)
        {
            List<TripLogData> tripLogFormatDataList = new List<TripLogData>();
            foreach (var trip in triplogList)
            {
                TripLogData triplog = new TripLogData();
                triplog.Id = trip.Id;
                triplog.Date = trip.DtTrip;
                //triplog.jobRef = _context.CrLogTripJobMains.Where(t => t.CrLogTripId == trip.Id).FirstOrDefault().JobMainId.ToString() ?? "0";
                triplog.jobRef = trip.CrLogTripJobMains.FirstOrDefault()?.JobMainId.ToString() ?? "0";
                triplog.Unit = trip.CrLogUnit?.Description ?? "";
                triplog.Driver = trip.CrLogDriver?.Name ?? "";
                triplog.Company = trip.CrLogCompany?.Name ?? "";
                triplog.Remarks = trip.Remarks ?? "";
                triplog.RentalRate = trip.Rate;
                triplog.Addon = trip.Addon;
                triplog.OT = trip.AddonOt ?? 0;
                triplog.Expenses = trip.Expenses;
                triplog.DriversFee = trip.DriverFee;
                triplog.DriverOT = trip.DriverOt;
                triplog.Time = trip.StartTime + " - " + trip.EndTime;

                tripLogFormatDataList.Add(triplog);
            }

            return tripLogFormatDataList;
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
