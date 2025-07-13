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

        public async Task<List<TripLogData>> GetTripLogsToday()
        {
            return  await this.GetTripLogsByDate(DateTime.Today, DateTime.Today);

            //var DbF = EF.Functions;
            //var today = DateTime.Today;

            //var triplogToday = await _context.CrLogTrips
            //    .Include(t => t.CrLogTripJobMains)
            //    .Where(t => DbF.DateDiffDay(t.DtTrip, today) == 0).ToListAsync();

            //List<TripLogData> tripLogFormatDataList = new List<TripLogData>();

            //foreach (var trip in triplogToday)
            //{
            //    TripLogData triplog = new TripLogData();
            //    triplog.Id = trip.Id;
            //    triplog.Date = trip.DtTrip;
            //    triplog.jobRef = _context.CrLogTripJobMains.Where(t => t.CrLogTripId == trip.Id).FirstOrDefault().JobMainId.ToString() ?? "0";
            //    triplog.Unit = _context.CrLogUnits.Find(trip.CrLogUnitId).Description ?? "";
            //    triplog.Driver = _context.CrLogDrivers.Find(trip.CrLogDriverId).Name ?? "";
            //    triplog.Company = _context.CrLogCompanies.Find(trip.CrLogCompanyId).Name ?? "";
            //    triplog.Remarks = trip.Remarks ?? "";
            //    triplog.Rate = trip.Rate;
            //    triplog.Addon = trip.Addon;
            //    triplog.OT = trip.AddonOt ?? 0;
            //    triplog.Expenses = trip.Expenses;
            //    triplog.DriverRate = trip.DriverFee;
            //    triplog.DriverOT = trip.DriverOt;
            //    triplog.Time = trip.StartTime + " - " + trip.EndTime;

            //    tripLogFormatDataList.Add(triplog);
            //}


            //return tripLogFormatDataList;
        }
    }
}
