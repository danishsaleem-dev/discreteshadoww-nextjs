import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: "https://discreteshadoww.com/sitemap.xml",
    host: "https://discreteshadoww.com",
  };
}
