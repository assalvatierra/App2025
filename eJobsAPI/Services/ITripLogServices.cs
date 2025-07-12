using eJobsAPI.Data;

namespace eJobsAPI.Services
{
    public interface ITripLogServices
    {
       public Task<List<TripLogData>> GetTripLogsToday();
    }
}
