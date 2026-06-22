using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp1.Server.Data;
using Erp.Domain.Models;
using Microsoft.Extensions.Configuration;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SysFeaturesController : ControllerBase
    {
        private readonly ErpDbContext _context;
        private readonly IConfiguration _configuration;

        public SysFeaturesController(ErpDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/SysFeatures
        // GET: api/SysFeatures?sysCode=FEATURE_CODE
        // GET: api/SysFeatures?name=FEATURE_NAME
        // GET: api/SysFeatures?sysCode=FEATURE_CODE&name=FEATURE_NAME
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SysFeature>>> GetSysFeature(
            [FromQuery] string? sysCode = null, 
            [FromQuery] string? name = null)
        {
            var query = _context.SysFeature.AsQueryable();

            if (!string.IsNullOrEmpty(sysCode))
            {
                query = query.Where(sf => sf.SysCode == sysCode);
            }

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(sf => sf.Name.Contains(name));
            }

            return await query.ToListAsync();
        }

        // GET: api/SysFeatures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SysFeature>> GetSysFeature(short id)
        {
            var sysFeature = await _context.SysFeature.FindAsync(id);

            if (sysFeature == null)
            {
                return NotFound();
            }

            return sysFeature;
        }

        // GET: api/SysFeatures/BySysCode/{sysCode}
        [HttpGet("BySysCode/{sysCode}")]
        public async Task<ActionResult<SysFeature>> GetSysFeatureBySysCode(string sysCode)
        {
            var sysFeature = await _context.SysFeature
                .FirstOrDefaultAsync(sf => sf.SysCode == sysCode);

            if (sysFeature == null)
            {
                return NotFound();
            }

            return sysFeature;
        }

        // GET: api/SysFeatures/Enabled
        [HttpGet("Enabled")]
        public async Task<ActionResult<IEnumerable<SysFeature>>> GetEnabledSysFeatures()
        {
            return await _context.SysFeature
                .Where(sf => sf.IsEnabled && sf.Expiry > DateTime.Now)
                .ToListAsync();
        }

        // GET: api/SysFeatures/GetAuthenticationType
        [HttpGet("GetAuthenticationType")]
        public ActionResult<string> GetAuthenticationType()
        {
            var authenticationType = _configuration["Authentication"];

            if (string.IsNullOrEmpty(authenticationType))
            {
                return NotFound("Authentication configuration not found");
            }

            return Ok(authenticationType);
        }

        // PUT: api/SysFeatures/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSysFeature(short id, SysFeature sysFeature)
        {
            if (id != sysFeature.Id)
            {
                return BadRequest();
            }

            _context.Entry(sysFeature).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SysFeatureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SysFeatures
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SysFeature>> PostSysFeature(SysFeature sysFeature)
        {
            _context.SysFeature.Add(sysFeature);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSysFeature", new { id = sysFeature.Id }, sysFeature);
        }

        // DELETE: api/SysFeatures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSysFeature(short id)
        {
            var sysFeature = await _context.SysFeature.FindAsync(id);
            if (sysFeature == null)
            {
                return NotFound();
            }

            _context.SysFeature.Remove(sysFeature);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SysFeatureExists(short id)
        {
            return _context.SysFeature.Any(e => e.Id == id);
        }
    }
}
