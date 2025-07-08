/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: "https://emmaculatecollege.com.ng",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  trailingSlash: false,
  exclude: ["/account/*", "/admin", "/secret-page", "/login", "/register"],
  sourceDir: "src/app",
};

export default sitemapConfig;
