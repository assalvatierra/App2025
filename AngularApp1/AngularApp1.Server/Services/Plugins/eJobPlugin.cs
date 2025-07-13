using Microsoft.SemanticKernel;
using System.ComponentModel;
using System.Net.Http;
using System.Threading.Tasks;

namespace AngularApp1.Server.Services.Plugins
{
    public class eJobPlugin
    {
        private string hostUrl = "https://localhost:7129/api/CrLogTrips/";

        [KernelFunction("get_trips")]
        [Description("Get the vehicle trips base on the given Date From and Date To Parameters. the rentalRate is the revenue or income amount for the trip. driversFee is driver's salary and additional expense for the trip")]
        public async Task<string> getGetTripsToday(System.DateTime tripDateFrom, System.DateTime tripDateTo)
        {
            string strUrl = $"{this.hostUrl}DateRange/{tripDateFrom:yyyy-MM-dd}/{tripDateTo:yyyy-MM-dd}";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(strUrl);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }

        }
    }
}
