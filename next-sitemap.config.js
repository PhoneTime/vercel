/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.phonetop.com.au',
    generateRobotsTxt: true, // 自动生成 robots.txt
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/404', '/500'],
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
      ],
    },
  }
  