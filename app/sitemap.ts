import type { MetadataRoute } from "next";
import { lessons } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/+$/, "");
  const publicPaths = ["/", "/learn", "/stereotypes", "/quiz", "/polls", "/stories", "/laws", "/about", ...lessons.map((lesson) => `/learn/${lesson.slug}`)];

  return publicPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7
  }));
}
