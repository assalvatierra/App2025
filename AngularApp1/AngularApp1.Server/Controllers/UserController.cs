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

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<ErpIdentityUser> _signInManager;
        private readonly ILogger<WeatherForecastController> _logger;

        public UserController(UserManager<IdentityUser> userManager, SignInManager<ErpIdentityUser> signInManager, ILogger<WeatherForecastController> logger)
        {
            _userManager = userManager;
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


        // POST: /Account/Register
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Copy data from RegisterViewModel to IdentityUser
                var user = new IdentityUser
                {
                    UserName = model.Email,
                    Email = model.Email
                };
                // Store user data in AspNetUsers database table
                var result = await _userManager.CreateAsync(user, model.Password);

                // If user is successfully created, sign-in the user using
                // SignInManager and redirect to index action of HomeController
                if (result.Succeeded)
                {
                    return Ok();
                }
                // If there are any errors, add them to the ModelState object
                // which will be displayed by the validation summary tag helper
                foreach (var error in result.Errors)
                {
                    //ModelState.AddModelError(string.Empty, error.Description);
                    //error in login
                    return Unauthorized();
                }
            }
            return Ok();
        }

    }
}
