import type { MetadataRoute } from "next";
import { getSiteUrl, guideSections } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/journey`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guideSections.map((section) => ({
      url: `${siteUrl}/guide/${section.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
