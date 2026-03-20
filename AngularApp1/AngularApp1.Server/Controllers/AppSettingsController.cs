using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController : ControllerBase
    {
        private readonly ErpDbContext _context;

        public AppSettingsController(ErpDbContext context)
        {
            _context = context;
        }

        // GET: api/AppSettings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppSetting>>> GetAppSettings()
        {
            return await _context.AppSetting.ToListAsync();
        }

        // GET: api/AppSettings/{key}
        [HttpGet("{key}")]
        public async Task<ActionResult<AppSetting>> GetAppSetting(string key)
        {
            var setting = await _context.AppSetting
                .FirstOrDefaultAsync(s => s.SysKey == key);

            if (setting == null)
            {
                return NotFound();
            }

            return setting;
        }
    }
}
