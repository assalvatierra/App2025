using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        /// <summary>
        /// Check authentication status - allows anonymous access
        /// </summary>
        [HttpGet("status")]
        [AllowAnonymous]
        public IActionResult GetAuthStatus()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                return Ok(new
                {
                    isAuthenticated = true,
                    userName = User.Identity.Name,
                    claims = User.Claims.Select(c => new { c.Type, c.Value })
                });
            }

            return Ok(new { isAuthenticated = false });
        }

        /// <summary>
        /// Protected endpoint to verify JWT token validation
        /// </summary>
        [HttpGet("verify")]
        [Authorize]
        public IActionResult VerifyToken()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                ?? User.FindFirst("sub")?.Value 
                ?? User.FindFirst("oid")?.Value;

            var email = User.FindFirst(ClaimTypes.Email)?.Value 
                ?? User.FindFirst("preferred_username")?.Value;

            return Ok(new
            {
                isValid = true,
                userId = userId,
                email = email,
                name = User.Identity?.Name,
                authenticationType = User.Identity?.AuthenticationType,
                claims = User.Claims.Select(c => new { c.Type, c.Value })
            });
        }
    }
}
