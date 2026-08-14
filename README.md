# WealthBoost Website

Static landing page for WealthBoost on iPhone and iPad. The canonical site is `wealthboost.app`; `wealthboost.ai` redirects to it.

## Main files

- `index.html` - canonical landing page
- `privacy_policy.html` - current app and website privacy policy at the Apple-declared `/privacy_policy` URL
- `styles.css` - shared responsive design
- `site.js` - navigation, interactive examples, reveal effects, FAQ, and consent-based analytics
- `assets/` - optimized screenshots, app artwork, symbols, font, and social preview
- `robots.txt` and `sitemap.xml` - search-engine discovery files for the canonical domain

## Deployment

The site has no build step. Publish `index.html`, `privacy_policy.html`, `styles.css`, `site.js`, `assets/`, `robots.txt`, `sitemap.xml`, and `CNAME` through GitHub Pages.

Google Analytics loads only after the visitor allows optional analytics.

The App Store destination is:

`https://apps.apple.com/app/wealthboost-ai-money-coach/id6756603789`
