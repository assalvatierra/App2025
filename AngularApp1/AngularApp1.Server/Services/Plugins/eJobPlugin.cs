using Microsoft.SemanticKernel;
using System.ComponentModel;
using System.Net.Http;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AngularApp1.Server.Services.Plugins
{
    public class eJobPlugin
    {
        private string hostUrl = "https://localhost:7129/api/CrLogTrips/";
        //private string hostUrl = "http://assalvatierra-001-site15.stempurl.com/api/CrLogTrips/";

        [KernelFunction("search_Trips")]
        [Description("Get the vehicle trips base on the given tripDateFrom, tripDateTo and options Parameters. " +
            "tripDateFrom and tripDateTo are the date range for the trip. Options parameter is used to filter the server query." +
            "Options parameter is formatted string like 'key1=option1;key2=option2'. Use _ if no parameter option needed." +
            "KEY values is limited to the following options: unit, company, driver, remarks. " +
            "Values are the parameter for the search for the given Key. Prefix the value with word 'NOT!' if excluding the value is the entention."+
            "Limitation: Currently supports Single Value per Key. Can not use same key multiple times."+
            "The rentalRate is the revenue or income amount for the trip. driversFee is driver's salary and additional expense for the trip")]
        public async Task<string> searchTrips(System.DateTime tripDateFrom, System.DateTime tripDateTo, string options)
        {
            string strUrl = $"{this.hostUrl}Search/{tripDateFrom:yyyy-MM-dd}/{tripDateTo:yyyy-MM-dd}/{options}";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(strUrl);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }

        }

        [KernelFunction("get_TripsToday")]
        [Description("Get the current day vehicle trips. " +
            "The rentalRate is the revenue or income amount for the trip. driversFee is driver's salary and additional expense for the trip")]
        public async Task<string> getTripsToday(System.DateTime tripDateFrom, System.DateTime tripDateTo, string options)
        {
            string strUrl = $"{this.hostUrl}today";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(strUrl);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }

        }

        [KernelFunction("search_collectibles")]
        [Description("Get company collectibles base on the given DateFrom, DateTo and options Parameters. " +
            "DateFrom and DateTo are the date range for the collectibles. Options parameter is used to filter the server query." +
            "Options parameter is formatted string like 'key1=option1;key2=option2'. Use _ if no parameter option needed." +
            "KEY values is limited to the following options: company, description, remarks. " +
            "Values are the parameter for the search for the given Key. Prefix the value with word 'NOT!' if excluding the value is the entention." +
            "Limitation: Currently supports Single Value per Key. Can not use same key multiple times." +
            "We can use JobRef to retrieve job information")]
        public async Task<string> searchReceivables(System.DateTime dateFrom, System.DateTime dateTo, string options)
        {
            string strUrl = $"{this.hostUrl}Search/{dateFrom:yyyy-MM-dd}/{dateTo:yyyy-MM-dd}/{options}";
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
