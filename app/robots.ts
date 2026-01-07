import { MetadataRoute } from "next";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/search?q=", "/admin/", "settings"]
    },
    sitemap: ["https://professorwillow.me/sitemap.xml"]
  };
}