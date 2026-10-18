# Windows 98 portfolio QA

Source: https://www.adamclambert.com/ and its 110-route sitemap, captured 2026-10-18. Route/template/media and UI resource inventory: `reference-inventory.json`.

## Reference checkpoint

- Browser-rendered source and local implementation captured at CSS/pixel sizes **1536×844** and **390×844**, density 1. No density normalization; desktop full-view pairs scaled equally to 50% with native-size login crops; mobile paired at native size.
- Temporary evidence: `.qa-v2-20261018/source-login-desktop.png`, `local-login-desktop-1.png`, `local-login-desktop-2.png`, `source-documents-mobile.png`, `local-documents-mobile-1.png`, `local-documents-mobile-2.png`.
- First combined comparison: `comparison-login-1.png`. P2: login 19px too high, form fields 40px too wide, and downloaded PNG wallpaper differed from browser-displayed CDN AVIF. Corrected viewport centering, constrained form width, and exported the actual rendered wallpaper.
- Mobile comparison found menu chrome 2px short and file icons centered within grid tracks instead of aligned to track starts. Corrected menu height, rule spacing, and grid alignment.
- Post-fix combined evidence: `comparison-login-2.png` (full view and native-size login crop) and `comparison-documents-mobile-2.png` (390px native paired views). Background crop, window proportions, bitmap typography, and mobile grid now align. Residual 1–4px border/control spacing differences are P3; the source's decorative dog toolbar thumbnail is intentionally replaced with owner imagery during personalization.
- Fonts: same regular/bold bitmap fonts, 16px UI/24px folder headings. CC BY-SA metadata verified. Times/Georgia serif and monospace retained for document templates.
- Colors: navy #000080, chrome #c0c0c0, teal #008080, beveled white/gray/black borders. Classic UI bitmap resources served locally.
- All **110** source paths opened in the local browser with a rendered window or the intentional empty desktop; zero React error-boundary screens. Individual third-party video playback is not claimed verified.
- Long third-party articles use short excerpts in this reference checkpoint; the final application replaces those articles and the reference owner's photographs/claims. It does not redistribute complete articles or Framer application code.

## Pending personalized acceptance

The reference checkpoint is not a production deployment. Owner-content mapping, full responsive/keyboard interaction checks, and Vercel Preview deep-link verification follow in the next commit. Temporary captures and scripts will be removed after the final report is recorded, per the owner's cleanup requirement.

final result: blocked
