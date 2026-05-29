using AngularApp1.Server.ReportServices;
using Microsoft.AspNetCore.Mvc;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        // GET: api/Report/GetTestReport
        [HttpGet("GetTestReport")]
        public IActionResult GetTestReport()
        {
            SampleReport report = new SampleReport();
            byte[] pdfBytes = report.generateSampleReport("Date: " + DateTime.UtcNow);

            return File(pdfBytes, "application/pdf", "TestReport.pdf");
        }
    }
}
