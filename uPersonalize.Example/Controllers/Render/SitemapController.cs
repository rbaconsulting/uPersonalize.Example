using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;
using uPersonalize.Example.Models;
using System.Collections.Generic;
using Umbraco.Extensions;

namespace uPersonalize.Example.Controllers.Render
{
    public class SitemapController : RenderController
    {
        private SiteSettings SiteSettings { get; set; }

        public SitemapController(ILogger<SitemapController> logger, ICompositeViewEngine compositeViewEngine, IUmbracoContextAccessor umbracoContextAccessor) :
                                base(logger, compositeViewEngine, umbracoContextAccessor)
        {

        }

        public override IActionResult Index()
        {
            var homePage = CurrentPage.Root();
            SiteSettings = homePage.FirstChild<SiteSettings>();

            var siteMapItems = new List<SitemapItem>
            {
                new SitemapItem()
                {
                    Loc = homePage.Url(mode: UrlMode.Absolute),
                    Lastmod = $"{homePage.UpdateDate:s}+00:00",
                    PageImage = homePage.Value<MediaWithCrops>("pageImage") ?? SiteSettings.FallbackPageImage
                }
            };

            siteMapItems = RenderSiteMap(homePage, siteMapItems);

            Response.ContentType = "text/xml";
            return CurrentTemplate(siteMapItems);
        }

        public List<SitemapItem> RenderSiteMap(IPublishedContent parentPage, List<SitemapItem> list)
        {
            foreach (var page in parentPage.Children)
            {
                if (page.IsComposedOf("seo") && !page.Value<bool>("excludeFromSitemap"))
                {
                    list.Add(new SitemapItem()
                    {
                        Loc = page.Url(mode: UrlMode.Absolute),
                        Lastmod = $"{page.UpdateDate:s}+00:00",
                        PageImage = page.Value<MediaWithCrops>("pageImage") ?? SiteSettings.FallbackPageImage
                    });
                }

                list = RenderSiteMap(page, list);
            }

            return list;
        }
    }
}