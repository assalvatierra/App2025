using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutomationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok( "[" + System.DateTime.Now.ToString() + "] : AutomationController is working!");
        }

        [HttpPost("ParseToJson")]
        public IActionResult ParseToJson([FromBody] string data)
        {
            try
            {
                var jsonData = System.Text.Json.JsonSerializer.Serialize(data);
                return Ok(jsonData);
            }
            catch (System.Exception ex)
            {
                return BadRequest("Error parsing to JSON: " + ex.Message);
            }
        }



    }
}
