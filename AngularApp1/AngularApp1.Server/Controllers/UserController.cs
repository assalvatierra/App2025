using AngularApp1.Server.Areas.Identity.Data;
using Erp.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly SignInManager<ErpIdentityUser> _signInManager;
        private readonly ILogger<WeatherForecastController> _logger;

        public UserController( SignInManager<ErpIdentityUser> signInManager, ILogger<WeatherForecastController> logger)
        {
            _signInManager = signInManager;
            _logger = logger;
        }


        // POST: api/User/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCredentials login)
        {
            //string email = "admin@gmail.com";
            //string password = "Admin123!";

            var result = await _signInManager.PasswordSignInAsync(login.username, login.password, true, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var token = GenerateJwtToken();
                return Ok(new { token });
            }
            else
            {
                return Unauthorized();
            }
        }

        private string GenerateJwtToken()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("123456-123456-123456-123456-123456"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "ABC",
                audience: "ALL",
                claims: new List<Claim>(new[] { new Claim("role", "admin") }),
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
