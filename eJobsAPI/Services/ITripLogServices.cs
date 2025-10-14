using eJobsAPI.Data;

namespace eJobsAPI.Services
{
    public interface ITripLogServices
    {
       public Task<List<TripLogData>> GetTripLogsToday();
       public Task<List<TripLogData>> GetTripLogsByDate(System.DateTime dtFrom, System.DateTime dtTo);
       public Task<List<TripLogData>> Search(System.DateTime dtFrom, System.DateTime dtTo,string? options);

    }
}
