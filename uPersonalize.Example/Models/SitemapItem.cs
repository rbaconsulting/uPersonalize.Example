using Umbraco.Cms.Core.Models;

namespace uPersonalize.Example.Models
{
	public class SitemapItem
	{
		public string Loc { get; set; }
		public string Lastmod { get; set; }
		public MediaWithCrops PageImage { get; set; }
	}
}