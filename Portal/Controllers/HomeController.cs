using Microsoft.AspNetCore.Mvc;
using Portal.DBServices;
using Portal.Models;
using System.Diagnostics;

namespace Portal.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPortalItemService _portalItemService;

        public HomeController(IPortalItemService portalItemService)
        {
            _portalItemService = portalItemService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> SearchItems(string? searchTerm)
        {
            var results = await _portalItemService.SearchItemsAsync(searchTerm ?? string.Empty);
            ViewBag.SearchTerm = searchTerm;
            return View("SearchResult", results);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
