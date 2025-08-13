using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using System.ComponentModel;
using System.Net.Http;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AngularApp1.Server.Services.Plugins
{
    public class eJobPlugin
    {
        private string hostUrl = "https://localhost:7129/api";
        //private string hostUrl = "http://assalvatierra-001-site15.stempurl.com/api";
        private string tripsController = "CrLogTrips";
        private string receivablesController = "Receivables";
        private string expensesController = "Expenses";
        private string maintenanceController = "Maintenance";
        private string jobsController = "Jobs";

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
            string strUrl = $"{this.hostUrl}/{this.tripsController}/Search/{tripDateFrom:yyyy-MM-dd}/{tripDateTo:yyyy-MM-dd}/{options}";
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
            string strUrl = $"{this.hostUrl}/{this.tripsController}/today";
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
            "DateFrom and DateTo are the date range for the collectible's invoice date. " +
            "If not specified, use last 3 months for the invoice date range." +
            "Options parameter is used to filter the server query." +
            "Options parameter is formatted string like 'key1=option1;key2=option2'. Use _ if no parameter option needed." +
            "KEY values is limited to the following options: company, description,remarks, DueDateFrom,DueDateTo, PaymentStatus. " +
            "Values are the parameter for the search for the given Key. "+
            "PaymentStatus options are: PAID, UNPAID. " +
            "DueDateFrom is start of date range filter for receivable's date due. Format is: yyyy-MM-dd. " +
            "DueDateTo is end of date range filter for receivable's date due. Format is: yyyy-MM-dd. " +
            //"Prefix the value with word 'NOT!' if excluding the value is the entention." +
            "Multiple keys is possible for multiple conditions."+
            "Limitation: Currently supports Single Value per Key. Can not use same key multiple times." +
            "We can use JobRef to retrieve job information")]
        public async Task<string> searchReceivables(System.DateTime dateFrom, System.DateTime dateTo, string options)
        {
            string encodedFrom = Uri.EscapeDataString(dateFrom.ToString("yyyy-MM-dd"));
            string encodedTo = Uri.EscapeDataString(dateTo.ToString("yyyy-MM-dd"));
            string encodedOptions = Uri.EscapeDataString(options);

            string strUrl = $"{this.hostUrl}/{this.receivablesController}/Search/{encodedFrom}/{encodedTo}/{encodedOptions}";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(strUrl);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }

        }

        [KernelFunction("search_expenses")]
        [Description("Get company expenses base on the given DateFrom, DateTo and options Parameters. " +
            "DateFrom and DateTo are the date range for the expenses. Options parameter is used to filter the server query." +
            "Options parameter is formatted string like 'key1=option1;key2=option2'. Use _ if no parameter option needed." +
            "KEY values is limited to the following options: account, category, description and remarks. " +
            "Values are the parameter for the search for the given Key. " +
            //"Prefix the value with word 'NOT!' if excluding the value is the entention." +
            "Limitation: Currently supports Single Value per Key. Can not use same key multiple times." +
            "We can use JobRef to retrieve job information")]
        public async Task<string> searchExpenses(System.DateTime dateFrom, System.DateTime dateTo, string options)
        {
            string encodedFrom = Uri.EscapeDataString(dateFrom.ToString("yyyy-MM-dd"));
            string encodedTo = Uri.EscapeDataString(dateTo.ToString("yyyy-MM-dd"));
            string encodedOptions = Uri.EscapeDataString(options);

            string strUrl = $"{this.hostUrl}/{this.expensesController}/Search/{encodedFrom}/{encodedTo}/{encodedOptions}";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(strUrl);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }

        }

        [KernelFunction("search_maintenance_record")]
        [Description("Get company vehicle's maintenance records base on the given DateFrom, DateTo and options Parameters. " +
            "DateFrom and DateTo are the date range for the expenses. Options parameter is used to filter the server query." +
            "Options parameter is formatted string like 'key1=option1;key2=option2'. Use _ if no parameter option needed." +
            "KEY values is limited to the following options: unit, plate, recordtype, remarks. " +
            "unit is the vehicle unit description, "+
            "plate is the vehicle plate number, "+
            "recordtype is the type of maintenance record, "+
            "remarks is the maintenance information. " +
            "Values are the parameter for the search for the given Key. " +
            //"Prefix the value with word 'NOT!' if excluding the value is the entention." +
            "Limitation: Currently supports Single Value per Key. Can not use same key multiple times." +
            "We can use InvItemId to retrieve more item information such as Item Details and Maintenance Recommendations.")]
        public async Task<string> searchMaintenance(System.DateTime dateFrom, System.DateTime dateTo, string options)
        {
            string encodedFrom = Uri.EscapeDataString(dateFrom.ToString("yyyy-MM-dd"));
            string encodedTo = Uri.EscapeDataString(dateTo.ToString("yyyy-MM-dd"));
            string encodedOptions = Uri.EscapeDataString(options);

            string strUrl = $"{this.hostUrl}/{this.maintenanceController}/Search/{encodedFrom}/{encodedTo}/{encodedOptions}";
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(strUrl);
                response.EnsureSuccessStatusCode();
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }

        }


        //GetQuicklist / GetActiveJobs
        [KernelFunction("get_ActiveServices")]
        [Description("Get Active job services in the given date range, dateFrom and dateTo. " )]
        public async Task<string> getActiveJobs(System.DateTime dateFrom, System.DateTime dateTo)
        {
            string encodedFrom = Uri.EscapeDataString(dateFrom.ToString("yyyy-MM-dd"));
            string encodedTo = Uri.EscapeDataString(dateTo.ToString("yyyy-MM-dd"));

            string strUrl = $"{this.hostUrl}/{this.jobsController}/GetQuicklist/{encodedFrom}/{encodedTo}";
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
