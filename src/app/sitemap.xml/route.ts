import { NextResponse } from "next/server";

export async function GET() {
  const urls = [
    { loc: "/", priority: 1.0 },
    { loc: "/about", priority: 0.8 },
    // Add more dynamically if needed
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `<url>
  <loc>https://emmaculatecollege.com.ng${loc}</loc>
  <changefreq>weekly</changefreq>
  <priority>${priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
