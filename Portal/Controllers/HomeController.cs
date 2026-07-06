using Microsoft.AspNetCore.Mvc;
using Portal.DBServices;
using Portal.Models;
using System.Diagnostics;

namespace Portal.Controllers
{
    public class HomeController : Controller
    {
        private readonly IPortalItemService _portalItemService;
        private readonly IPortalCategoryServices _portalCategoryService;

        public HomeController(IPortalItemService portalItemService, IPortalCategoryServices portalCategoryService)
        {
            _portalItemService = portalItemService;
            _portalCategoryService = portalCategoryService;
        }

        public async Task<IActionResult> Index()
        {
            var categories = await _portalCategoryService.GetAllByStatusAsync("Active");
            ViewBag.Categories = categories;

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> SearchItems([FromQuery] SearchDto search)
        {
            var results = await _portalItemService.SearchItemsAsync(search);
            ViewBag.SearchTerm = search.searchTerm;
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
