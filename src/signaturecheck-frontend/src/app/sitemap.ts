import type { MetadataRoute } from "next";

import { guideList } from "@/content/guides";
import { landingPageList } from "@/content/seo-landings";
import { SITE_UPDATED_AT, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const landingRoutes: MetadataRoute.Sitemap = landingPageList.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: SITE_UPDATED_AT,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guideList.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: page.updatedAtIso,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: SITE_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...landingRoutes,
    ...guideRoutes,
  ];
}
