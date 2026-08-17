# WealthBoost Website

Static landing page for WealthBoost on iPhone and iPad. The canonical site is `wealthboost.app`; `wealthboost.ai` redirects to it.

## Main files

- `index.html` - canonical landing page
- `privacy_policy.html` - current app and website privacy policy at the Apple-declared `/privacy_policy` URL
- `styles.css` - shared responsive design
- `site.js` - navigation, interactive examples, reveal effects, FAQ, and consent-based analytics
- `assets/` - optimized screenshots, app artwork, symbols, font, and social preview
- `what-is-wealthboost.html`, `personalized-guidance.html`, `ai-coach.html`, and the other resource pages - crawlable product documentation
- `index.md` and the topic Markdown files - concise machine-readable alternatives to the HTML pages
- `llms.txt` and `llms-full.txt` - product discovery and consolidated factual context for AI agents
- `robots.txt` and `sitemap.xml` - explicit search and AI crawler access plus canonical URL discovery

## Deployment

The site has no build step. Publish `index.html`, `privacy_policy.html`, `styles.css`, `site.js`, `assets/`, `robots.txt`, `sitemap.xml`, and `CNAME` through GitHub Pages.

Cloudflare Web Analytics measures aggregate visits without cookies. Google Analytics loads only after the visitor allows optional analytics. Cloudflare Crawler Hints should remain enabled, AI crawlers should remain allowed, and the custom `robots.txt` must not be replaced by Cloudflare Managed robots.txt.

The App Store destination is:

`https://apps.apple.com/app/wealthboost-ai-money-coach/id6756603789`
