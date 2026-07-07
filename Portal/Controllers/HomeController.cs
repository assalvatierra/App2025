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
        private readonly IPortalContentService _portalContentService;

        public HomeController(
            IPortalItemService portalItemService, 
            IPortalCategoryServices portalCategoryService,
            IPortalContentService portalContentService)
        {
            _portalItemService = portalItemService;
            _portalCategoryService = portalCategoryService;
            _portalContentService = portalContentService;
        }

        public async Task<IActionResult> Index()
        {
            var categories = await _portalCategoryService.GetAllByStatusAsync("Active");

            // fetch categories for Product
            ViewBag.ProductCategories = categories
                .Where(c => c.PortalCategory.CategoryType == "Product");

            // Fetch the categories for the "Service" type
            //var ServiceCategories = categories
            //    .Where(c => c.PortalCategory.CategoryType == "Service");
            ViewBag.ServiceCategories = await _portalContentService.GetContentsByCategoryAsync("Services", null);



                return View();
        }

        [HttpGet]
        public async Task<IActionResult> SearchItems([FromQuery] SearchDto search)
        {
            var results = await _portalItemService.SearchItemsAsync(search);
            ViewBag.SearchTerm = search.searchTerm;
            ViewBag.PageTitle = "Car Rental Search Results";
            ViewBag.PageMessage = $"Search results for: {search.searchTerm}";
            return View("ItemList", results);
        }

        [HttpGet]
        public async Task<IActionResult> ItemsByCategory(string category)
        {
            var results = await _portalItemService.GetItemsByCategory(category,"Product");
            ViewBag.Category = category;
            ViewBag.PageTitle = "Car Rental Items by Category";
            ViewBag.PageMessage = $"Items in category: {category}";
            return View("ItemList", results);
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
